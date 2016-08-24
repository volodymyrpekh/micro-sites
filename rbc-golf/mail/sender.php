<?php
// required files
require 'mail_script.php';

$config_item['charset'] = 'UTF-8';

// email settings
$config = [];
$config['protocol']     = 'smtp';
$config['smtp_host']    = 'ss://';
$config['smtp_user']    = '';
$config['smtp_pass']    = '';
$config['smtp_port']    = 465;
$config['smtp_timeout'] = 20;
$config['wordwrap']     = TRUE;
$config['wrapchars']    = 76;
$config['mailtype']     = 'html';
$config['charset']      = 'UTF-8';
$config['validate']     = TRUE;
$config['crlf']         = "\r\n";
$config['newline']      = "\r\n";

$to_address = 'hharrysidhu@gmail.com';

$from_address = 'tester@email.com'; // input field
$form_name = 'email name';
$subject = 'subject to test email';

// Pass some data into the email templates
$email_data = array();
$email_data['firstname'] = 'Look';
$email_data['lastname'] = 'look';
$email_data['email'] = 'tester@email.com';


define('MB_ENABLED', TRUE);
define('ICONV_ENABLED', TRUE);

$email_sender = new CI_Email($config);

$email_sender->from($from_address, $form_name);
$email_sender->to($to_address);
$email_sender->subject($subject);
$email_sender->message(view('email_template', $email_data));
//$email_sender->set_alt_message(view('email_template', $email_data));
if (! $email_sender->send())
{
    exit('error' . 'User::create - Unable to send new user email. Response is as follows:' . $email_sender->print_debugger() . "\n\n");
}
else
{
    echo 'email sent';
}


// Load view function
function view($path, $data)
{
    ob_start();
    extract($data);
    include($path.'.php');
    return ob_get_clean();
}

function is_php($version)
{
    static $_is_php;
    $version = (string) $version;

    if ( ! isset($_is_php[$version]))
    {
        $_is_php[$version] = version_compare(PHP_VERSION, $version, '>=');
    }

    return $_is_php[$version];
}

function log_message($level, $msg)
{
    $level = strtoupper($level);

    $filepath = 'logs/'.'log-'.date('Y-m-d').'.txt';
    $message = '';

    if ( ! file_exists($filepath))
    {
        $newfile = TRUE;
    }
    if ( ! $fp = @fopen($filepath, 'ab'))
    {
        return FALSE;
    }

    $date = new DateTime('now');
    $date = $date->format('Y-m-d H:i:s');
    $message .= $level.' - '.$date.' --> '.$msg."\n";

    flock($fp, LOCK_EX);

    for ($written = 0, $length = strlen($message); $written < $length; $written += $result)
    {
        if (($result = fwrite($fp, substr($message, $written))) === FALSE)
        {
            break;
        }
    }

    flock($fp, LOCK_UN);
    fclose($fp);

    if (isset($newfile) && $newfile === TRUE)
    {
        chmod($filepath, $this->_file_permissions);
    }

    return is_int($result);

}
