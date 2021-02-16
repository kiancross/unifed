/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Typography } from "@material-ui/core";

const PrivacyPolicyPage = (): ReactElement => {
  return (
    <>
      <Typography variant="h3">Our contact details</Typography>
      <Typography variant="body1">
        <ul>
          <li>Name: Foo</li>
          <li>Address: Bar</li>
          <li>Phone Number: Bar</li>
          <li>Email: Bar</li>
        </ul>
      </Typography>
      <Typography variant="h3">The type of personal information we collect</Typography>
      <Typography variant="body1">
        We currently collect and process the following information:
        <ul>
          <li>
            Personal identifiers, contacts and characteristics (for example, name and contact
            details)
          </li>
          <li>[Add to this list as appropriate]</li>
        </ul>
      </Typography>
      <Typography variant="h3">How we get the personal information and why we have it</Typography>
      <Typography variant="body1">
        Most of the personal information we process is provided to us directly by you for one of the
        following reasons:
        <ul>
          <li>[Add the reasons you collected personal information] [If applicable]</li>
        </ul>
        We also receive personal information indirectly, from the following sources in the following
        scenarios:
        <ul>
          <li>
            [Add the source of any data collected indirectly and why you collected the personal
            information]
          </li>
        </ul>
        We use the information that you have given us in order to
        <ul>
          <li>[list how you use the personal information].</li>
        </ul>
        We may share this information with [enter organisations or individuals]. Under the General
        Data Protection Regulation (GDPR), the lawful bases we rely on for processing this
        information are:
        <ol type="a">
          <li>
            Your consent. You are able to remove your consent at any time. You can do this by
            contacting [contact details]
          </li>
          <li>We have a contractual obligation.</li>
          <li>We have a legal obligation.</li>
          <li>We have a vital interest.</li>
          <li>We need it to perform a public task.</li>
          <li>We have a legitimate interest.</li>
        </ol>
      </Typography>
      <Typography variant="h3">How we store your personal information</Typography>
      <Typography variant="body1">
        Your information is securely stored [enter location]. We keep [type of personal information]
        for [time period]. We will then dispose your information by [explain how you will delete
        their data]. Your data protection rights Under data protection law, you have rights
        including:
        <ul>
          <li>
            Your right of access - You have the right to ask us for copies of your personal
            information.
          </li>
          <li>
            Your right to rectification - You have the right to ask us to rectify personal
            information you think is inaccurate. You also have the right to ask us to complete
            information you think is incomplete.
          </li>
          <li>
            Your right to erasure - You have the right to ask us to erase your personal information
            in certain circumstances.
          </li>
          <li>
            Your right to restriction of processing - You have the right to ask us to restrict the
            processing of your personal information in certain circumstances.
          </li>
          <li>
            Your right to object to processing - You have the the right to object to the processing
            of your personal information in certain circumstances.
          </li>
          <li>
            Your right to data portability - You have the right to ask that we transfer the personal
            information you gave us to another organisation, or to you, in certain circumstances.
          </li>
        </ul>
        You are not required to pay any charge for exercising your rights. If you make a request, we
        have one month to respond to you. Please contact us at [insert email address, phone number
        and or postal address] if you wish to make a request.
      </Typography>
      <Typography variant="h3">How to complain</Typography>
      <Typography variant="body1">
        If you have any concerns about our use of your personal information, you can make a
        complaint to us at [Insert your organisation’s contact details for data protection queries].
        You can also complain to the ICO if you are unhappy with how we have used your data. The
        ICO’s address: Information Commissioner’s Office Wycliffe House Water Lane Wilmslow Cheshire
        SK9 5AF Helpline number: 0303 123 1113 ICO website: https://www.ico.org.uk
      </Typography>
    </>
  );
};

export default PrivacyPolicyPage;
