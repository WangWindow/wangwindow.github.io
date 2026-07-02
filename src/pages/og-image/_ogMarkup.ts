import { siteConfig } from "@/site.config";

export const ogMarkup = (title: string, pubDate: string) => ({
  type: "div",
  props: {
    style: {
      backgroundColor: "#1d1f21",
      color: "#c9cacc",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: 40,
            width: "100%",
          },
          children: [
            {
              type: "p",
              props: {
                style: {
                  fontSize: 24,
                  marginBottom: 24,
                },
                children: pubDate,
              },
            },
            {
              type: "h1",
              props: {
                style: {
                  color: "#fff",
                  fontSize: 64,
                  fontWeight: 700,
                  lineHeight: 1.375,
                },
                children: title,
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            alignItems: "center",
            borderTop: "2px solid #2bbc89",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            padding: 40,
            width: "100%",
          },
          children: [
            {
              type: "p",
              props: {
                style: {
                  fontSize: 24,
                  fontWeight: 600,
                  marginLeft: 12,
                },
                children: siteConfig.title,
              },
            },
            {
              type: "p",
              props: {
                children: `by ${siteConfig.author}`,
              },
            },
          ],
        },
      },
    ],
  },
});
