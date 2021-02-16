/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Typography, Link } from "@material-ui/core";
import LogoTemplate from "../../components/LogoTemplate";

const PrivacyPolicyPage = (): ReactElement => {
  return (
    <LogoTemplate direction="vertical">
      <Typography variant="h2">Privacy Notice</Typography>
      <Typography variant="body1">
        <strong>Last Modified:</strong> 16th February 2021
      </Typography>
      <Typography variant="h4">Our contact details</Typography>
      <Typography variant="body1">
        <ul>
          <li>
            <strong>Name:</strong> Unifed
          </li>
          <li>
            <strong>Address:</strong> &mdash;
          </li>
          <li>
            <strong>Phone Number:</strong> &mdash;
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <Link href="mailto:cs3099.a3.unifed@gmail.com">cs3099.a3.unifed@gmail.com</Link>
          </li>
        </ul>
      </Typography>
      <Typography variant="h4">The type of personal information we collect</Typography>
      <Typography variant="body1">
        We currently collect and process the following information:
        <ul>
          <li>
            Personal identifiers, contacts and characteristics (for example, your name and contact
            details).
          </li>
          <li>Online identifiers (for example, your IP address).</li>
          <li>Content that you create or upload, such as posts.</li>
        </ul>
      </Typography>
      <Typography variant="h4">How we get the personal information and why we have it</Typography>
      <Typography variant="body1">
        Most of the personal information we process is provided to us directly by you for one of the
        following reasons:
        <ul>
          <li>To signup to the website.</li>
          <li>To create and upload content.</li>
        </ul>
        We also receive personal information indirectly, from the following sources in the following
        scenarios:
        <ul>
          <li>Your IP address, which is sent to us whilst you access the website.</li>
        </ul>
        We use the information that you have given us in order to:
        <ul>
          <li>Provide you with access to the website.</li>
          <li>Allow you to create content on and upload content to the website.</li>
          <li>Protect other users on the website.</li>
        </ul>
        Under the General Data Protection Regulation (GDPR), the lawful basis we rely on for
        processing this information is your consent. You are able to remove your consent at any
        time. You can do this by contacting us using the details at the top of this notice.
      </Typography>
      <Typography variant="h4">How we store your personal information</Typography>
      <Typography variant="body1">
        Your information is securely stored in the United Kingdom. Your personal information is
        stored whilst you have an account on the website. If you delete your account, we will erase
        your personal data.
      </Typography>
      <Typography variant="h4">How we process your personal information</Typography>
      <Typography variant="body1">
        Personal identifiers, contacts, characteristics (for example, your name and contact details)
        and your IP address are always kept private. Your username and any posts you make are
        publically available. Publically available content may be saved and downloaded by third
        parties outside of our control.
      </Typography>
      <Typography variant="h4">Your data protection rights</Typography>
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
      <Typography variant="h4">How to complain</Typography>
      <Typography variant="body1">
        If you have any concerns about our use of your personal information, you can make a
        complaint to us using the contact details at the top of this notice. You can also complain
        to the ICO if you are unhappy with how we have used your data. The ICO's: <br />
        <strong>Address:</strong>
        <br /> Information Commissioner's Office
        <br /> Wycliffe House
        <br /> Water Lane
        <br /> Wilmslow
        <br /> Cheshire
        <br /> SK9 5AF
        <br />
        <strong>Helpline number:</strong> 0303 123 1113 <br />
        <strong>Website:</strong>{" "}
        <Link href="https://www.ico.org.uk" target="blank">
          https://www.ico.org.uk
        </Link>
      </Typography>
    </LogoTemplate>
  );
};

export default PrivacyPolicyPage;
