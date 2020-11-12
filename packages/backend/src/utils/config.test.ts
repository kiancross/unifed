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
    expect(() => config.smtpHost).toThrow();
  });
  
  test("SMTP_HOST = undefined", () => {
    process.env.SMTP_HOST = "mail.test.com";
    expect(config.smtpHost).toBe("mail.test.com");
  });
});

describe("smtpPort", () => {
  test("SMTP_PORT = undefined", () => {
    expect(() => config.smtpPort).toThrow();
  });
  
  test("SMTP_PORT = string", () => {
    process.env.SMTP_PORT = "string";
    expect(() => config.smtpPort).toThrow();
  });
  
  test("SMTP_PORT = number", () => {
    process.env.SMTP_PORT = "1010";
    expect(config.smtpPort).toBe(1010);
  });
});

describe("smtpUsername", () => {
  test("SMTP_USERNAME = undefined", () => {
    expect(() => config.smtpUsername).toThrow();
  });
  
  test("SMTP_USERNAME = string", () => {
    process.env.SMTP_USERNAME = "string";
    expect(config.smtpUsername).toBe("string");
  });
});

describe("smtpPassword", () => {
  test("SMTP_PASSWORD = undefined", () => {
    expect(() => config.smtpPassword).toThrow();
  });
  
  test("SMTP_PASSWORD = string", () => {
    process.env.SMTP_PASSWORD = "string";
    expect(config.smtpPassword).toBe("string");
  });
});

describe("mongoHostname", () => {
  test("MONGO_HOSTNAME = undefined", () => {
    expect(() => config.mongoHostname).toThrow();
  });
  
  test("MONGO_HOSTNAME = string", () => {
    process.env.MONGO_HOSTNAME = "string";
    expect(config.mongoHostname).toBe("string");
  });
});

describe("mongoPort", () => {
  test("MONGO_PORT = undefined", () => {
    expect(() => config.mongoPort).toThrow();
  });
  
  test("MONGO_PORT = string", () => {
    process.env.MONGO_PORT = "string";
    expect(() => config.mongoPort).toThrow();
  });
  
  test("MONGO_PORT = number", () => {
    process.env.MONGO_PORT = "1010";
    expect(config.mongoPort).toBe(1010);
  });
});

describe("mongoDatabase", () => {
  test("MONGO_DATABASE = undefined", () => {
    expect(() => config.mongoDatabase).toThrow();
  });
  
  test("MONGO_DATABASE = string", () => {
    process.env.MONGO_DATABASE = "string";
    expect(config.mongoDatabase).toBe("string");
  });
});

describe("mongoUsername", () => {
  test("MONGO_USERNAME = undefined", () => {
    expect(() => config.mongoUsername).toThrow();
  });
  
  test("MONGO_USERNAME = string", () => {
    process.env.MONGO_USERNAME = "string";
    expect(config.mongoUsername).toBe("string");
  });
});

describe("mongoPassword", () => {
  test("MONGO_PASSWORD = undefined", () => {
    expect(() => config.mongoPassword).toThrow();
  });
  
  test("MONGO_PASSWORD = string", () => {
    process.env.MONGO_PASSWORD = "string";
    expect(config.mongoPassword).toBe("string");
  });
});

describe("jwtSecret", () => {
  test("JWT_SECRET = undefined", () => {
    expect(() => config.jwtSecret).toThrow();
  });
  
  test("JWT_SECRET = string", () => {
    process.env.JWT_SECRET = "string";
    expect(config.jwtSecret).toBe("string");
  });
});

describe("applicationName", () => {
  test("APPLICATION_NAME = undefined", () => {
    expect(() => config.applicationName).toThrow();
  });
  
  test("APPLICATION_NAME = string", () => {
    process.env.APPLICATION_NAME = "string";
    expect(config.applicationName).toBe("string");
  });
});
