# Example-Dial-With-Dub Project

This project demonstrates how to handle inbound calls, forward them to another destination, and play an audio message indicating that the call is being recorded. It uses [jambonz](https://www.jambonz.org/) `dial` and `dub` verbs, together with the `dub` command. Communication is handled via HTTP webhooks.

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed.
2. **Environment Variables**:
   - `JAMBONZ_ACCOUNT_SID`: Your jambonz account SID.
   - `JAMBONZ_API_KEY`: Your jambonz API key.
   - `JAMBONZ_REST_API_BASE_URL`: The base URL for the jambonz REST API.

These environment variables are required to run the project. The application will throw errors if any of these are missing.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/example-dial-with-dub.git
   cd example-dial-with-dub
   npm ci
   JAMBONZ_ACCOUNT_SID=account-sid JAMBONZ_API_KEY=api-key JAMBONZ_REST_API_BASE_URL=https://jambonz.cloud/api/v1 npm start
   ```

## I'm new to jambonz and I need more help!

Got you covered.  Easiest way to get started is to [create a free trial account on jambonz.cloud](https://jambonz.cloud/register).  Once you have an account, add a Carrier for your chosen SIP trunking provider.  Then add an Application that contains the websocket endpoint that this application exposes.  Add a phone number from your Carrier and connect it to the Application, and you are set to go.

## I have more questions!
Join our Slack channel by going to https://joinslack/jambonz.org.
