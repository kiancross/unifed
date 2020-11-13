/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { config } from "../config";

describe("debug", () => {
  it("NODE_ENV = production", () => {
    process.env.NODE_ENV = "production";
    expect(config.debug).to.be.false;
  });
  
  it("NODE_ENV = test", () => {
    process.env.NODE_ENV = "test";
    expect(config.debug).to.be.true;
  });
  
  it("NODE_ENV = debug", () => {
    process.env.NODE_ENV = "debug";
    expect(config.debug).to.be.true;
  });
});

describe("smtpHost", () => {
  it("SMTP_HOST = undefined", () => {
    delete process.env.SMTP_HOST;
    expect(() => config.smtpHost).to.throw();
  });
  
  it("SMTP_HOST = undefined", () => {
    process.env.SMTP_HOST = "mail.test.com";
    expect(config.smtpHost).to.equal("mail.test.com");
  });
});

describe("smtpPort", () => {
  it("SMTP_PORT = undefined", () => {
    delete process.env.SMTP_PORT;
    expect(() => config.smtpPort).to.throw();
  });
  
  it("SMTP_PORT = string", () => {
    process.env.SMTP_PORT = "597-string";
    expect(() => config.smtpPort).to.throw();
  });
  
  it("SMTP_PORT = number", () => {
    process.env.SMTP_PORT = "597";
    expect(config.smtpPort).to.equal(597);
  });
});

describe("smtpUsername", () => {
  it("SMTP_USERNAME = undefined", () => {
    delete process.env.SMTP_USERNAME;
    expect(() => config.smtpUsername).to.throw();
  });
  
  it("SMTP_USERNAME = string", () => {
    process.env.SMTP_USERNAME = "email_user";
    expect(config.smtpUsername).to.equal("email_user");
  });
});

describe("smtpPassword", () => {
  it("SMTP_PASSWORD = undefined", () => {
    delete process.env.SMTP_PASSWORD;
    expect(() => config.smtpPassword).to.throw();
  });
  
  it("SMTP_PASSWORD = string", () => {
    process.env.SMTP_PASSWORD = "user_password";
    expect(config.smtpPassword).to.equal("user_password");
  });
});

describe("mongoHostname", () => {
  it("MONGO_HOSTNAME = undefined", () => {
    delete process.env.MONGO_HOSTNAME;
    expect(() => config.mongoHostname).to.throw();
  });
  
  it("MONGO_HOSTNAME = string", () => {
    process.env.MONGO_HOSTNAME = "dbhost";
    expect(config.mongoHostname).to.equal("dbhost");
  });
});

describe("mongoPort", () => {
  it("MONGO_PORT = undefined", () => {
    delete process.env.MONGO_PORT;
    expect(() => config.mongoPort).to.throw();
  });
  
  it("MONGO_PORT = string", () => {
    process.env.MONGO_PORT = "119-string";
    expect(() => config.mongoPort).to.throw();
  });
  
  it("MONGO_PORT = number", () => {
    process.env.MONGO_PORT = "27017";
    expect(config.mongoPort).to.equal(27017);
  });
});

describe("mongoDatabase", () => {
  it("MONGO_DATABASE = undefined", () => {
    delete process.env.MONGO_DATABASE;
    expect(() => config.mongoDatabase).to.throw();
  });
  
  it("MONGO_DATABASE = string", () => {
    process.env.MONGO_DATABASE = "dbname";
    expect(config.mongoDatabase).to.equal("dbname");
  });
});

describe("mongoUsername", () => {
  it("MONGO_USERNAME = undefined", () => {
    delete process.env.MONGO_USERNAME;
    expect(() => config.mongoUsername).to.throw();
  });
  
  it("MONGO_USERNAME = string", () => {
    process.env.MONGO_USERNAME = "dbuser";
    expect(config.mongoUsername).to.equal("dbuser");
  });
});

describe("mongoPassword", () => {
  it("MONGO_PASSWORD = undefined", () => {
    delete process.env.MONGO_PASSWORD;
    expect(() => config.mongoPassword).to.throw();
  });
  
  it("MONGO_PASSWORD = string", () => {
    process.env.MONGO_PASSWORD = "dbpass";
    expect(config.mongoPassword).to.equal("dbpass");
  });
});

describe("jwtSecret", () => {
  it("JWT_SECRET = undefined", () => {
    delete process.env.JWT_SECRET;
    expect(() => config.jwtSecret).to.throw();
  });
  
  it("JWT_SECRET = string", () => {
    process.env.JWT_SECRET = "jwtsec";
    expect(config.jwtSecret).to.equal("jwtsec");
  });
});

describe("siteHost", () => {
  it("SITE_HOST = undefined", () => {
    delete process.env.SITE_HOST;
    expect(() => config.siteHost).to.throw();
  });
  
  it("SITE_HOST = string", () => {
    process.env.SITE_HOST = "sitehost";
    expect(config.siteHost).to.equal("sitehost");
  });
});

describe("siteProtocol", () => {
  it("SITE_PROTOCOL = undefined", () => {
    delete process.env.SITE_PROTOCOL;
    expect(() => config.siteProtocol).to.throw();
  });
  
  it("SITE_PROTOCOL = string", () => {
    process.env.SITE_HOST = "http";
    expect(config.siteHost).to.equal("http");
  });
  
  it("SITE_PROTOCOL = string", () => {
    process.env.SITE_HOST = "https";
    expect(config.siteHost).to.equal("https");
  });
});

describe("siteUrl", () => {
  it("SITE_HOST = undefined", () => {
    delete process.env.SITE_HOST;
    process.env.SITE_PROTOCOL = "http";
    expect(() => config.siteUrl).to.throw();
  });
  
  it("SITE_PROTOCOL = undefined", () => {
    process.env.SITE_HOST = "sitehost";
    delete process.env.SITE_PROTOCOL;
    expect(() => config.siteUrl).to.throw();
  });
  
  it("Format", () => {
    process.env.SITE_HOST = "sitehost";
    process.env.SITE_PROTOCOL = "http";
    expect(config.siteUrl).to.equal("http://sitehost");
  });
});

describe("applicationName", () => {
  it("APPLICATION_NAME = undefined", () => {
    delete process.env.APPLICATION_NAME;
    expect(() => config.applicationName).to.throw();
  });
  
  it("APPLICATION_NAME = string", () => {
    process.env.APPLICATION_NAME = "appname";
    expect(config.applicationName).to.equal("appname");
  });
});
