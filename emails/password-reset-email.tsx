/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import {
  Img,
  Button,
  Html,
  Container,
  Head,
  Font,
  Tailwind,
  Text,
  Link,
} from "@react-email/components";

export const PasswordResetEmail = ({ url }: { url: string }) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Questrial"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Questrial&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#0bab7c",
              },
            },
          },
        }}
      >
        <Container
          className="p-4 rounded-lg shadow bg-slate-100 flex-center-center text-center"
          style={{
            border: "1px solid #ccc",
          }}
        >
          <Text className="text-2xl font-bold my-2">Password Reset</Text>
          <Img
            src="https://bloggie.vercel.app/logo.png"
            alt="Test"
            height="80"
            width="80"
            className="mx-auto"
          />
          <Text className="mt-2 text-lg text-left">
            Click the following button to reset your password
          </Text>
          <Button
            href={url}
            className="bg-brand px-6 py-3 rounded-full font-medium leading-4 text-white w-max mx-auto"
          >
            Click me
          </Button>
          <Text className="mt-4 text-lg text-left">
            If the above didn't work, copy and paste this link into your web
            browser address bar to reset your password
          </Text>
          <Link href={url} className="text-brand underline mt-2 text-base">
            {url}
          </Link>
          <Text className="mt-4 pt-3 border-t border-t-slate-500 text-sm text-slate-600">
            ©{new Date().getFullYear()} Bloggie
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
};
