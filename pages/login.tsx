import React, { useEffect } from "react";
import { ClientSafeProvider, signIn, useSession } from "next-auth/react";

import { getProviders } from "next-auth/react";
import { useRouter } from "next/router";

interface LoginProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function Login({ providers }: LoginProps) {
  const { data, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (data) {
    router.push("/home");
  }
  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            onClick={async () => {
              await signIn(provider.id);
            }}
            className="bg-twitterWhite text-black font-bold py-2 px-4 rounded flex items-center"
          >
            <img src="./google.png" alt="" className="h-14" />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
