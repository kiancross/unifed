/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Typography, Link } from "@material-ui/core";

const PrivacyPolicyPage = (): ReactElement => {
  return (
    <>
      <Typography variant="body1">Last Modified: 16th February 2021</Typography>
      <Typography variant="h3">Our contact details</Typography>
      <Typography variant="body1">
        <ul>
          <li>Name: Unifed</li>
          <li>Address: TODO</li>
          <li>Phone Number: TODO</li>
          <li>
            Email: <Link href="mailto:cs3099.a3.unifed@gmail.com">cs3099.a3.unifed@gmail.com</Link>
          </li>
        </ul>
      </Typography>
      <Typography variant="h3">The type of personal information we collect</Typography>
      <Typography variant="body1">
        We currently collect and process the following information:
        <ul>
          <li>
            personal identifiers, contacts and characteristics (for example, name and contact
            details);
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
      </Typography>
      <Typography variant="body1">
        We also receive personal information indirectly, from the following sources in the following
        scenarios:
        <ul>
          <li>
            [Add the source of any data collected indirectly and why you collected the personal
            information]
          </li>
        </ul>
      </Typography>
      <Typography variant="body1">
        We use the information that you have given us in order to
        <ul>
          <li>[list how you use the personal information].</li>
        </ul>
      </Typography>
      <Typography variant="body1">
        We may share this information with [enter organisations or individuals].
      </Typography>
      <Typography variant="body1">
        Under the General Data Protection Regulation (GDPR), the lawful basis we rely on for
        processing this information is your consent. You are able to remove your consent at any
        time. You can do this by contacting [contact details]
      </Typography>
      <Typography variant="h3">How we store your personal information</Typography>
      <Typography variant="body1">
        Your information is securely stored in the United Kingdom.
      </Typography>
      <Typography variant="body1">
        We keep [type of personal information] for [time period]. We will then dispose your
        information by [explain how you will delete their data].
      </Typography>
      <Typography variant="h3">Your data protection rights</Typography>
      <Typography variant="body1">
        Under data protection law, you have rights including:
        <ul>
          <li>
            <strong>Your right of access</strong> &mdash; You have the right to ask us for copies of
            your personal information.
          </li>
          <li>
            <strong>Your right to rectification</strong> &mdash; You have the right to ask us to
            rectify personal information you think is inaccurate. You also have the right to ask us
            to complete information you think is incomplete.
          </li>
          <li>
            <strong>Your right to erasure</strong> &mdash; You have the right to ask us to erase
            your personal information in certain circumstances.
          </li>
          <li>
            <strong>Your right to restriction of processing</strong> &mdash; You have the right to
            ask us to restrict the processing of your personal information in certain circumstances.
          </li>
          <li>
            <strong>Your right to object to processing</strong> &mdash; You have the the right to
            object to the processing of your personal information in certain circumstances.
          </li>
          <li>
            <strong>Your right to data portability</strong> &mdash; You have the right to ask that
            we transfer the personal information you gave us to another organisation, or to you, in
            certain circumstances.
          </li>
        </ul>
        You are not required to pay any charge for exercising your rights. If you make a request, we
        have one month to respond to you. Please contact us using the contact details at the top of
        this notice if you wish to make a request.
      </Typography>
      <Typography variant="h3">How to complain</Typography>
      <Typography variant="body1">
        If you have any concerns about our use of your personal information, you can make a
        complaint to us using the contact details at the top of this notice.
      </Typography>
      <Typography variant="body1">
        You can also complain to the ICO if you are unhappy with how we have used your data. The
        ICO's address:
        <br /> Information Commissioner's Office
        <br /> Wycliffe House
        <br /> Water Lane
        <br /> Wilmslow
        <br /> Cheshire
        <br /> SK9 5AF Helpline number: 0303 123 1113 ICO website: https://www.ico.org.uk
      </Typography>
    </>
  );
};

export default PrivacyPolicyPage;
