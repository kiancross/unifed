/*
 * CS3099 Group A3
 */

import { config } from "./config";

describe("debug", () => {
  test("NODE_ENV = production", () => {
    process.env.NODE_ENV = "production";
    expect(config.debug).toBe(false);
  });
  
  test("NODE_ENV = test", () => {
    process.env.NODE_ENV = "test";
    expect(config.debug).toBe(true);
  });
  
  test("NODE_ENV = debug", () => {
    process.env.NODE_ENV = "debug";
    expect(config.debug).toBe(true);
  });
});

describe("smtpHost", () => {
  test("SMTP_HOST = undefined", () => {
    delete process.env.SMTP_HOST;
    expect(() => config.smtpHost).toThrow();
  });
  
  test("SMTP_HOST = undefined", () => {
    process.env.SMTP_HOST = "mail.test.com";
    expect(config.smtpHost).toBe("mail.test.com");
  });
});

describe("smtpPort", () => {
  test("SMTP_PORT = undefined", () => {
    delete process.env.SMTP_PORT;
    expect(() => config.smtpPort).toThrow();
  });
  
  test("SMTP_PORT = string", () => {
    process.env.SMTP_PORT = "597-string";
    expect(() => config.smtpPort).toThrow();
  });
  
  test("SMTP_PORT = number", () => {
    process.env.SMTP_PORT = "597";
    expect(config.smtpPort).toBe(597);
  });
});

describe("smtpUsername", () => {
  test("SMTP_USERNAME = undefined", () => {
    delete process.env.SMTP_USERNAME;
    expect(() => config.smtpUsername).toThrow();
  });
  
  test("SMTP_USERNAME = string", () => {
    process.env.SMTP_USERNAME = "email_user";
    expect(config.smtpUsername).toBe("email_user");
  });
});

describe("smtpPassword", () => {
  test("SMTP_PASSWORD = undefined", () => {
    delete process.env.SMTP_PASSWORD;
    expect(() => config.smtpPassword).toThrow();
  });
  
  test("SMTP_PASSWORD = string", () => {
    process.env.SMTP_PASSWORD = "user_password";
    expect(config.smtpPassword).toBe("user_password");
  });
});

describe("mongoHostname", () => {
  test("MONGO_HOSTNAME = undefined", () => {
    delete process.env.MONGO_HOSTNAME;
    expect(() => config.mongoHostname).toThrow();
  });
  
  test("MONGO_HOSTNAME = string", () => {
    process.env.MONGO_HOSTNAME = "dbhost";
    expect(config.mongoHostname).toBe("dbhost");
  });
});

describe("mongoPort", () => {
  test("MONGO_PORT = undefined", () => {
    delete process.env.MONGO_PORT;
    expect(() => config.mongoPort).toThrow();
  });
  
  test("MONGO_PORT = string", () => {
    process.env.MONGO_PORT = "119-string";
    expect(() => config.mongoPort).toThrow();
  });
  
  test("MONGO_PORT = number", () => {
    process.env.MONGO_PORT = "27017";
    expect(config.mongoPort).toBe(27017);
  });
});

describe("mongoDatabase", () => {
  test("MONGO_DATABASE = undefined", () => {
    delete process.env.MONGO_DATABASE;
    expect(() => config.mongoDatabase).toThrow();
  });
  
  test("MONGO_DATABASE = string", () => {
    process.env.MONGO_DATABASE = "dbname";
    expect(config.mongoDatabase).toBe("dbname");
  });
});

describe("mongoUsername", () => {
  test("MONGO_USERNAME = undefined", () => {
    delete process.env.MONGO_USERNAME;
    expect(() => config.mongoUsername).toThrow();
  });
  
  test("MONGO_USERNAME = string", () => {
    process.env.MONGO_USERNAME = "dbuser";
    expect(config.mongoUsername).toBe("dbuser");
  });
});

describe("mongoPassword", () => {
  test("MONGO_PASSWORD = undefined", () => {
    delete process.env.MONGO_PASSWORD;
    expect(() => config.mongoPassword).toThrow();
  });
  
  test("MONGO_PASSWORD = string", () => {
    process.env.MONGO_PASSWORD = "dbpass";
    expect(config.mongoPassword).toBe("dbpass");
  });
});

describe("jwtSecret", () => {
  test("JWT_SECRET = undefined", () => {
    delete process.env.JWT_SECRET;
    expect(() => config.jwtSecret).toThrow();
  });
  
  test("JWT_SECRET = string", () => {
    process.env.JWT_SECRET = "jwtsec";
    expect(config.jwtSecret).toBe("jwtsec");
  });
});

describe("siteHost", () => {
  test("SITE_HOST = undefined", () => {
    delete process.env.SITE_HOST;
    expect(() => config.siteHost).toThrow();
  });
  
  test("SITE_HOST = string", () => {
    process.env.SITE_HOST = "sitehost";
    expect(config.siteHost).toBe("sitehost");
  });
});

describe("siteProtocol", () => {
  test("SITE_PROTOCOL = undefined", () => {
    delete process.env.SITE_PROTOCOL;
    expect(() => config.siteProtocol).toThrow();
  });
  
  test("SITE_PROTOCOL = string", () => {
    process.env.SITE_HOST = "http";
    expect(config.siteHost).toBe("http");
  });
  
  test("SITE_PROTOCOL = string", () => {
    process.env.SITE_HOST = "https";
    expect(config.siteHost).toBe("https");
  });
});

describe("siteUrl", () => {
  test("SITE_HOST = undefined", () => {
    delete process.env.SITE_HOST;
    process.env.SITE_PROTOCOL = "http";
    expect(() => config.siteUrl).toThrow();
  });
  
  test("SITE_PROTOCOL = undefined", () => {
    process.env.SITE_HOST = "sitehost";
    delete process.env.SITE_PROTOCOL;
    expect(() => config.siteUrl).toThrow();
  });
  
  test("format", () => {
    process.env.SITE_HOST = "sitehost";
    process.env.SITE_PROTOCOL = "http";
    expect(config.siteUrl).toBe("http://sitehost");
  });
});

describe("applicationName", () => {
  test("APPLICATION_NAME = undefined", () => {
    delete process.env.APPLICATION_NAME;
    expect(() => config.applicationName).toThrow();
  });
  
  test("APPLICATION_NAME = string", () => {
    process.env.APPLICATION_NAME = "appname";
    expect(config.applicationName).toBe("appname");
  });
});
