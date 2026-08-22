import type { ReactElement } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { classes } from "@/data/classes";
import announcement, { isExternalLink } from "@/data/announcement";
import { homepage } from "@/data/homepage";
import { DancerPlaceholder } from "@components/DancerPlaceholder";

const featuredClasses = classes.filter((c) => c.featured);

const features = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
    title: "Expert Instructors",
    body: "Our professional staff brings decades of performance and teaching experience across all dance styles.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    title: "Confidence & Community",
    body: "Dance builds self-confidence, friendships, and a sense of belonging that extends beyond the studio.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
    title: "20+ Seasons of Excellence",
    body: "Award-winning choreography and a proven track record of developing talented, well-rounded dancers.",
  },
];

function HomePage(): ReactElement {
  return (
    <>
      <Helmet>
        <title>Next Step Dance Studio — Birdsboro, PA</title>
        <meta
          name="description"
          content="Next Step Dance Studio offers quality dance instruction for children of all ages in Birdsboro, PA. Classes in ballet, tap, jazz, hip hop, lyrical, acro, and more."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[520px] overflow-hidden md:h-[620px]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: homepage.heroImagePosition }}
          src={homepage.heroImage}
          alt="Next Step Dance Studio dancers"
        />
        <div className="from-studio-purple/90 via-studio-purple/70 to-studio-purple/30 absolute inset-0 bg-gradient-to-r" />
        <div className="relative flex h-full max-w-3xl flex-col justify-center px-8 sm:px-16">
          <p className="mb-3 text-sm font-semibold tracking-widest text-pink-300 uppercase">
            Birdsboro, PA · Celebrating 20+ Seasons
          </p>
          <h1 className="mb-5 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Dare to Dance.
            <br />
            <em className="text-pink-300 not-italic">Dare to Take</em> the Next Step.
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-purple-200">
            Quality dance instruction for children of all ages in a supportive, nurturing studio
            environment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/classes"
              className="bg-studio-pink rounded-full px-7 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-pink-700"
            >
              Explore Classes
            </Link>
            <Link
              to="/registration"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Announcement banner — content and on/off toggle live in the CMS */}
      {announcement.enabled && (
        <section className="bg-studio-pink px-6 py-4">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div>
              <span className="font-semibold text-white">{announcement.headline}</span>
              {announcement.subtext && (
                <span className="ml-2 text-sm text-pink-100">{announcement.subtext}</span>
              )}
            </div>
            {announcement.buttonLabel &&
              announcement.buttonLink &&
              (isExternalLink(announcement.buttonLink) ? (
                <a
                  href={announcement.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-studio-pink flex-shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-pink-50"
                >
                  {announcement.buttonLabel} →
                </a>
              ) : (
                <Link
                  to={announcement.buttonLink}
                  className="text-studio-pink flex-shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-pink-50"
                >
                  {announcement.buttonLabel} →
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Features strip */}
      <section className="bg-studio-purple-light px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-3 text-center">
              <div className="text-studio-pink">{f.icon}</div>
              <h3 className="text-studio-purple font-serif text-xl font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Class preview */}
      <section className="bg-studio-lavender px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-studio-pink mb-2 text-sm font-semibold tracking-widest uppercase">
              What We Offer
            </p>
            <h2 className="text-studio-purple font-serif text-3xl font-semibold sm:text-4xl">
              Our Dance Styles
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredClasses.map((cls) => (
              <div
                key={cls.title}
                className="group overflow-hidden rounded-2xl border border-purple-100 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-48 overflow-hidden">
                  {cls.image ? (
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <DancerPlaceholder />
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-studio-purple font-serif text-lg font-semibold">
                      {cls.title}
                    </h3>
                    <span className="bg-studio-pink-light text-studio-purple rounded-full px-2.5 py-1 text-xs font-semibold">
                      {cls.ages}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{cls.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/classes"
              className="text-studio-pink inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
            >
              View all classes
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section className="bg-stone-50 px-6 py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-pink-700 uppercase">
              Our Mission
            </p>
            <h2 className="text-studio-purple mb-5 font-serif text-3xl leading-snug font-semibold sm:text-4xl">
              Building Dancers for Life
            </h2>
            <div className="flex flex-col gap-4 leading-relaxed text-gray-600">
              <p>
                Help your child develop confidence, creativity, and a love for the arts — while
                making friends and having fun in the process.
              </p>
              <p>
                We are committed to building each dancer with a foundation that will last a lifetime
                on and off the dance floor. Since 2005, Next Step has been the home for dancers
                throughout Birdsboro, Douglassville, Morgantown, and the greater Reading area.
              </p>
            </div>
            <Link
              to="/staff"
              className="mt-6 inline-block font-semibold text-pink-700 hover:underline"
            >
              Meet our instructors →
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://nebula.wsimg.com/c956d2eb3c6f4223730168289b83265a?AccessKeyId=B77414135F6586AF8FC2&disposition=0&alloworigin=1"
              alt="Next Step Dance Studio 17th season celebration"
              className="w-full rounded-2xl object-cover shadow-xl"
            />
            <div className="bg-studio-pink absolute -bottom-4 -left-4 rounded-xl px-5 py-3 text-white shadow-lg">
              <p className="font-serif text-2xl font-semibold">20+</p>
              <p className="text-xs font-semibold tracking-wide uppercase">Seasons of Dance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="bg-studio-purple px-6 py-16 text-center">
        <p className="mb-3 text-sm font-semibold tracking-widest text-pink-300 uppercase">
          Enrollment Open
        </p>
        <h2 className="mb-4 font-serif text-3xl font-semibold text-white sm:text-4xl">
          Ready to Take the Next Step?
        </h2>
        <p className="mx-auto mb-8 max-w-xl leading-relaxed text-purple-300">
          Join our dance family today. Registration is simple and we'd love to find the perfect
          class for your child.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/registration"
            className="bg-studio-pink rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-pink-700"
          >
            Enroll Now
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-purple-400 px-8 py-3 font-semibold text-purple-200 transition-colors hover:border-white hover:text-white"
          >
            Ask a Question
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
