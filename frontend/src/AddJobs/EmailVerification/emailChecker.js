const personalEmailProviders = [
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "zoho.com",
  "yandex.com",
  "protonmail.com",
  "gmx.com",
  "lycos.com",
  "rediffmail.com",
  "tutanota.com",
  "fastmail.com",
  "hushmail.com",
  "lavabit.com",
  "runbox.com",
  "mailfence.com",
  "inbox.com",
  "seznam.cz",
  "q.com",
  "charter.net",
  "comcast.net",
  "verizon.net",
  "att.net",
  "sbcglobal.net",
  "me.com",
  "mac.com",
  "earthlink.net",
  "mindspring.com",
  "netzero.net",
  "juno.com",
  "rocketmail.com",
  "msn.com",
  "live.com",
  // Add more personal email providers as needed
];

const isBusinessEmail = (email) => {
  const domain = email.split("@")[1];
  return !personalEmailProviders.includes(domain);
};

export default isBusinessEmail;
