tell application "Google Chrome"
  activate
  if (count of windows) = 0 then make new window
  tell active tab of front window to set URL to "https://dashboard.stripe.com/payment-links/create"
end tell
