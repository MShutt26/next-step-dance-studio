import type { ReactElement } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import onlineRegistration from "@/data/onlineRegistration";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * The portal is a third-party embed (GoStudioPro). It never reports its height,
 * so the frame is a fixed box with its own scrollbar. On phones the portal runs
 * past 15,000px tall, which makes that box a scroll trap — so small screens get
 * a link out instead of an embed.
 */
const EMBED_HEIGHT_PX = 1000;

function RegisterOnlinePage(): ReactElement {
  const canEmbed = useMediaQuery("(min-width: 768px)");
  const { portalUrl } = onlineRegistration;

  return (
    <>
      <Helmet>
        <title>Register Online — Next Step Dance Studio</title>
        <meta
          name="description"
          content="Browse this season's class schedule and enroll online at Next Step Dance Studio in Birdsboro, PA."
        />
      </Helmet>

      {/* Page hero */}
      <section className="bg-studio-purple px-6 py-16 text-center">
        <p className="mb-3 text-sm font-semibold tracking-widest text-pink-300 uppercase">
          Enrollment Open
        </p>
        <h1 className="mb-4 font-serif text-4xl font-semibold text-white sm:text-5xl">
          Register Online
        </h1>
        <p className="mx-auto mb-8 max-w-xl leading-relaxed text-purple-300">
          Every class, day, and time for this season — updated live as spots fill. Choose a class
          to enroll and secure your spot right away.
        </p>
        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-studio-pink inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-pink-700"
        >
          Open registration portal
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
        <p className="mt-3 text-xs text-purple-400">Opens in a new tab</p>
      </section>

      {/* Portal */}
      <section className="bg-studio-lavender px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {canEmbed ? (
            <>
              <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
                <iframe
                  src={portalUrl}
                  title="Class schedule and online registration"
                  className="block w-full border-0"
                  style={{ height: `${EMBED_HEIGHT_PX}px` }}
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">
                Trouble with the schedule above?{" "}
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-studio-pink font-semibold hover:underline"
                >
                  Open it in a new tab
                </a>
                .
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-purple-100 bg-white p-8 text-center shadow-sm">
              <h2 className="text-studio-purple mb-3 font-serif text-2xl font-semibold">
                View the class schedule
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                Our full schedule and registration open in a new tab — it works much better on a
                phone than squeezed into this page.
              </p>
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-studio-pink inline-block rounded-full px-7 py-3 font-semibold text-white transition-colors hover:bg-pink-700"
              >
                Open schedule &amp; register →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Fallback to the studio form */}
      <section className="bg-studio-purple-light px-6 py-14 text-center">
        <h2 className="text-studio-purple mb-3 font-serif text-2xl font-semibold sm:text-3xl">
          Prefer to fill out a form?
        </h2>
        <p className="mx-auto mb-6 max-w-md text-gray-600">
          You can send us your registration details instead and we'll follow up to confirm your
          child's placement.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/registration"
            className="border-studio-purple text-studio-purple hover:bg-studio-purple rounded-full border px-7 py-3 font-semibold transition-colors hover:text-white"
          >
            Use the registration form
          </Link>
          <Link
            to="/contact"
            className="text-studio-pink rounded-full px-7 py-3 font-semibold transition-colors hover:underline"
          >
            Ask a question
          </Link>
        </div>
      </section>
    </>
  );
}

export default RegisterOnlinePage;
