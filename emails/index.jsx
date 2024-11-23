import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl = "";
  
  export const Email = ({
    userFirstName ,
    duration,
    meetingTime ,
    date ,
    meetingUrl,
    businessName 
  }) => {
    return (
      <Html>
        <Head />
        <Preview>Your Upcoming Meeting</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
              <Img
                src={`${baseUrl}/static/business-logo.png`}
                alt="Business Logo"
                width={150}
              />
            </Section>
  
            <Section style={content}>
              <Row>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {userFirstName},
                </Heading>
              </Row>
              <Row>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  Your meeting with {businessName} is scheduled!
                </Text>
              </Row>
  
              <Row>
                <Column>
                  <Text style={paragraph}>
                    <b>Meeting Duration:</b> {duration}
                  </Text>
                  <Text style={paragraph}>
                    <b>Meeting Time:</b> {meetingTime}
                  </Text>
                  <Text style={paragraph}>
                    <b>Date:</b> {date}
                  </Text>
                  <Text style={paragraph}>
                    <b>Meeting Link:</b>{" "}
                    <a href={meetingUrl} style={linkStyle}>
                      {meetingUrl}
                    </a>
                  </Text>
                </Column>
              </Row>
  
              <Row style={{ ...boxInfos, paddingTop: "20px" }}>
                <Column style={containerButton} colSpan={2}>
                  <Button
                    style={button}
                    href={meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Meeting
                  </Button>
                </Column>
              </Row>
            </Section>
  
            <Section style={containerImageFooter}>
              <Img
                style={image}
                width={620}
                src={`${baseUrl}/static/footer-image.png`}
                alt="Footer Image"
              />
            </Section>
  
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
                marginTop: "20px",
              }}
            >
              © 2024 | {businessName}. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default Email;
  
  // Styles
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
    marginBottom: "10px",
  };
  
  const logo = {
    padding: "20px 0",
    textAlign: "center",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#0073e6",
    borderRadius: 5,
    color: "#FFF",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    padding: "12px 30px",
    textDecoration: "none",
    display: "inline-block",
  };
  
  const linkStyle = {
    color: "#0073e6",
    textDecoration: "underline",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "20px",
  };
  
  const image = {
    maxWidth: "100%",
    borderRadius: "8px",
  };
  
  const boxInfos = {
    padding: "10px 20px",
  };
  
  const containerImageFooter = {
    padding: "30px 0 0 0",
  };
  