<?php
// Receives a lead from the site chat (src/scripts/chat.js) and emails it to Sakib as a plain, flat HTML message.
// Everything from the browser is treated as untrusted: same-site requests only, sizes capped, a honeypot field,
// a minimum fill time, one message per minute per address, and no user text is ever placed in a mail header.
declare(strict_types=1);

const LEAD_TO = 'islamsakib.official@gmail.com';
const LEAD_FROM = 'support@mywrkbase.com';
const ALLOWED_HOSTS = ['sakib.mywrkbase.com'];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function finish(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    finish(405, ['ok' => false, 'error' => 'method']);
}

$originHost = parse_url($_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? ''), PHP_URL_HOST);
if (!is_string($originHost) || !in_array(strtolower($originHost), ALLOWED_HOSTS, true)) {
    finish(403, ['ok' => false, 'error' => 'origin']);
}

$raw = file_get_contents('php://input', false, null, 0, 16384);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    finish(400, ['ok' => false, 'error' => 'body']);
}

// Bots fill hidden fields and answer instantly. Reply "ok" so they do not retry, but send nothing.
if (!empty($data['company']) || (int) ($data['elapsed'] ?? 0) < 4000) {
    finish(200, ['ok' => true]);
}

// Three senders: the chat, the old audit console, and the contact page (type "business" or "agency").
// Fields listed in $optional may be empty; every other field is required.
$type = is_string($data['type'] ?? null) ? $data['type'] : 'chat';
$forms = [
    'audit' => [['site' => 'Site', 'worry' => 'Main worry', 'contact' => 'Reply to'], [], 'Free Audit request', 'From the audit console on'],
    'business' => [['name' => 'Name', 'contact' => 'Email', 'need' => 'Needs', 'site' => 'Site', 'timeline' => 'Timeline', 'budget' => 'Budget', 'message' => 'Message'], ['site', 'need', 'timeline', 'budget'], 'New business inquiry', 'From the contact page on'],
    'agency' => [['name' => 'Name', 'contact' => 'Email', 'agency' => 'Agency', 'work' => 'Work', 'timeline' => 'Timeline', 'budget' => 'Budget', 'message' => 'Message'], ['agency', 'work', 'timeline', 'budget'], 'New agency inquiry', 'From the contact page on'],
    'chat' => [['need' => 'Needs', 'site' => 'Site', 'goal' => 'Goal', 'timeline' => 'Timeline', 'budget' => 'Budget', 'name' => 'Name', 'contact' => 'Reply to'], [], 'New project lead', 'From the chat on'],
];
[$fields, $optional, $heading, $source] = $forms[$type] ?? $forms['chat'];
$isAudit = $type === 'audit';
$lead = [];
foreach ($fields as $key => $label) {
    $value = $data[$key] ?? '';
    if (!is_string($value)) {
        finish(400, ['ok' => false, 'error' => 'field']);
    }
    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    $value = mb_substr($value, 0, $key === 'message' ? 2000 : 600);
    if ($value === '' && !in_array($key, $optional, true)) {
        finish(400, ['ok' => false, 'error' => 'missing ' . $key]);
    }
    $lead[$key] = $value;
}
// The contact page asks for an email address only.
if (in_array($type, ['business', 'agency'], true) && !filter_var($lead['contact'], FILTER_VALIDATE_EMAIL)) {
    finish(400, ['ok' => false, 'error' => 'contact']);
}

// The reply address must be an email address or a phone number, whatever the page's own checks let through.
$digits = preg_replace('/\D/', '', $lead['contact']) ?? '';
$isPhone = preg_match('/^[+()\d\s.-]+$/', $lead['contact']) === 1 && strlen($digits) >= 8 && strlen($digits) <= 15;
if (!filter_var($lead['contact'], FILTER_VALIDATE_EMAIL) && !$isPhone) {
    finish(400, ['ok' => false, 'error' => 'contact']);
}

// One message per minute per visitor address.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$stamp = sys_get_temp_dir() . '/lead_' . hash('sha256', $ip);
if (is_file($stamp) && time() - (int) filemtime($stamp) < 60) {
    finish(429, ['ok' => false, 'error' => 'slow down']);
}
@touch($stamp);

$page = is_string($data['page'] ?? null) ? mb_substr($data['page'], 0, 120) : '/';
$rows = '';
$text = '';
foreach ($fields as $key => $label) {
    if ($lead[$key] === '') {
        continue;
    }
    $safe = nl2br(htmlspecialchars($lead[$key], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
    $rows .= '<tr><td style="padding:12px 16px;border-bottom:1px solid #e6e4dd;color:#6b6963;font-size:13px;width:110px;vertical-align:top">' . $label
        . '</td><td style="padding:12px 16px;border-bottom:1px solid #e6e4dd;color:#191817;font-size:15px">' . $safe . '</td></tr>';
    $text .= $label . ': ' . $lead[$key] . "\n";
}

$html = '<!doctype html><html><body style="margin:0;padding:24px;background:#f5f4ef;font-family:Arial,Helvetica,sans-serif">'
    . '<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6e4dd">'
    . '<tr><td colspan="2" style="padding:20px 16px;background:#191817;color:#f5f4ef;font-size:18px;font-weight:bold">' . $heading
    . '<div style="font-size:12px;font-weight:normal;color:#aaa79d;margin-top:4px">' . $source . ' sakib.mywrkbase.com' . htmlspecialchars($page, ENT_QUOTES, 'UTF-8') . ' · ' . gmdate('j M Y, H:i') . ' UTC</div></td></tr>'
    . $rows
    . '<tr><td colspan="2" style="padding:14px 16px;color:#6b6963;font-size:12px">Reply to the contact above. Replying to this email only works when they gave an email address.</td></tr>'
    . '</table></body></html>';

$boundary = 'b' . bin2hex(random_bytes(12));
$headers = [
    'From: Portfolio chat <' . LEAD_FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
];
// Reply-To is only ever a validated email address, never raw user text.
if (filter_var($lead['contact'], FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $lead['contact'];
}
$body = '--' . $boundary . "\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n" . $text . "\r\n"
    . '--' . $boundary . "\r\nContent-Type: text/html; charset=utf-8\r\n\r\n" . $html . "\r\n"
    . '--' . $boundary . "--\r\n";

// The subject is one of two fixed strings, so no visitor text reaches a mail header.
$subject = ['audit' => 'Free Audit request', 'business' => 'New business inquiry from the portfolio', 'agency' => 'New agency inquiry from the portfolio'][$type] ?? 'New project lead from the portfolio chat';

// This host refuses PHP mail(), so the message is handed to the mailbox's own SMTP server.
// The password lives in lead-config.php beside this file. That file is created on the server only: it is not in the
// repository and not part of a deploy. Until a password is set, sending fails and the page offers WhatsApp instead.
$config = is_file(__DIR__ . '/lead-config.php') ? require __DIR__ . '/lead-config.php' : [];
$sent = ($config['pass'] ?? '') !== '' && smtp_send($config['pass'], LEAD_TO, $subject, $headers, $body);
if (!$sent) {
    @unlink($stamp);
}
finish($sent ? 200 : 500, ['ok' => $sent]);

// A minimal SMTP client: implicit TLS, AUTH LOGIN, one recipient. Returns true only if the server accepted the message.
function smtp_send(string $pass, string $to, string $subject, array $headers, string $body): bool
{
    $socket = @stream_socket_client('ssl://smtp.hostinger.com:465', $errno, $errstr, 15);
    if (!$socket) {
        error_log("lead smtp connect: $errstr");
        return false;
    }
    stream_set_timeout($socket, 15);
    // Reads one reply (which may span several lines) and checks its status code.
    $expect = function (int $code) use ($socket): bool {
        do {
            $line = fgets($socket, 600);
        } while ($line !== false && isset($line[3]) && $line[3] === '-');
        $ok = $line !== false && (int) substr($line, 0, 3) === $code;
        if (!$ok) {
            error_log('lead smtp: wanted ' . $code . ', got ' . trim((string) $line));
        }
        return $ok;
    };
    $say = fn (string $line) => fwrite($socket, $line . "\r\n");
    $message = implode("\r\n", array_merge($headers, ['To: ' . $to, 'Subject: ' . $subject, 'Date: ' . date('r'), 'Message-ID: <' . bin2hex(random_bytes(12)) . '@mywrkbase.com>']))
        . "\r\n\r\n" . preg_replace('/^\./m', '..', $body);

    $ok = $expect(220)
        && $say('EHLO sakib.mywrkbase.com') && $expect(250)
        && $say('AUTH LOGIN') && $expect(334)
        && $say(base64_encode(LEAD_FROM)) && $expect(334)
        && $say(base64_encode($pass)) && $expect(235)
        && $say('MAIL FROM:<' . LEAD_FROM . '>') && $expect(250)
        && $say('RCPT TO:<' . $to . '>') && $expect(250)
        && $say('DATA') && $expect(354)
        && $say($message . "\r\n.") && $expect(250);
    $say('QUIT');
    fclose($socket);
    return $ok;
}
