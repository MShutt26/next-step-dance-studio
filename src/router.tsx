import { createBrowserRouter, type RouteObject } from "react-router";
import Root from "./routes/Root";
import HomePage from "./routes/HomePage";
import NotFoundPage from "./routes/NotFoundPage";
import ErrorPage from "./routes/ErrorPage";
import { recitalVisible } from "./data/recitalVisibility";

const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: "dev/email-preview",
        lazy: async () => ({
          Component: (await import("./routes/EmailPreviewPage")).default,
        }),
      },
      {
        path: "dev/error-preview",
        Component: () => { throw new Error("Error boundary preview"); },
      },
    ]
  : [];

/** Registered only while the recital is visible, so hiding it in the CMS 404s the URLs too. */
const recitalRoutes: RouteObject[] = recitalVisible
  ? [
      {
        path: "recital",
        lazy: async () => ({ Component: (await import("./routes/RecitalPage")).default }),
      },
      {
        path: "recital/program",
        lazy: async () => ({
          Component: (await import("./routes/RecitalProgramPage")).default,
        }),
      },
    ]
  : [];

/** Lazy-loaded so Framer Motion, fat page deps, and the gallery glob stay off the home chunk. */
const contentRoutes: RouteObject[] = [
  {
    path: "classes",
    lazy: async () => ({ Component: (await import("./routes/ClassesPage")).default }),
  },
  {
    path: "staff",
    lazy: async () => ({ Component: (await import("./routes/StaffPage")).default }),
  },
  {
    path: "registration",
    lazy: async () => ({
      Component: (await import("./routes/RegistrationPage")).default,
    }),
  },
  {
    path: "contact",
    lazy: async () => ({ Component: (await import("./routes/ContactPage")).default }),
  },
  {
    path: "gallery",
    lazy: async () => ({ Component: (await import("./routes/PhotosPage")).default }),
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          ...contentRoutes,
          ...recitalRoutes,
          ...devRoutes,
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
