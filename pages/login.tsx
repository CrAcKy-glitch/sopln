import React, { useEffect } from "react";
import { ClientSafeProvider, signIn, useSession } from "next-auth/react";

import { getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/loading";
import Image from "next/image";

interface LoginProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function Login({ providers }: LoginProps) {
  const { data, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loader />;
  }
  if (data) {
    router.push("/home");
  }
  if (!providers) {
    return <div>Loading providers</div>;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div className="rounded mx-6 my-5 md:my-0">
          <Image
            src={"/sopln.jpeg"}
            alt="logo"
            width={400}
            height={400}
            className="rounded-xl"
          />
        </div>
        <div className="h-60 w-1 hidden sm:block bg-twitterLightGray"></div>

        <div className="flex flex-col items-center justify-center h-screen">
          {Object.values(providers).map((provider) => (
            <>
              <div key={provider.id} className="m-2">
                <button
                  onClick={async () => {
                    await signIn(provider.id);
                  }}
                  className="bg-twitterWhite text-black font-bold py-2 px-4 rounded flex items-center"
                >
                  {provider.name == "Google" ? (
                    <Image
                      src={"/google.png"}
                      alt=""
                      className=""
                      width={60}
                      height={30}
                    />
                  ) : (
                    <Image
                      src={"/github.png"}
                      alt=""
                      className=""
                      width={60}
                      height={30}
                    />
                  )}
                  Sign in with {provider.name}
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
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
