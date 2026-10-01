"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function ThirdPartyAnalytics({
  gaId,
  hotjarId,
  hotjarVersion,
}: {
  gaId?: string;
  hotjarId?: string;
  hotjarVersion: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (!gaId) return;

    const flags = window as unknown as Record<string, unknown>;
    flags[`ga-disable-${gaId}`] = isAdmin;
  }, [gaId, isAdmin]);

  if (isAdmin) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      ) : null}

      {hotjarId ? (
        <Script
          id="hotjar-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      ) : null}
    </>
  );
}
