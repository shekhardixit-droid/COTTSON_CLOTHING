import { ArrowUpRight } from "lucide-react";

const needs = [
  {
    id: 1,
    title: "Events & Exhibitions",
    description:
      "Custom tees and polos for conferences, exhibitions, product launches and corporate events.",
    image: "/images/corporate-needs/events.jpg",
    button: "Order for Your Event",
    href: "#contact",
  },
  {
    id: 2,
    title: "Everyday Office Wear",
    description:
      "Keep your team looking sharp every day with customised shirts, polos and professional workwear.",
    image: "/images/corporate-needs/office.jpg",
    button: "Get a Quote for Your Team",
    href: "#contact",
  },
  {
    id: 3,
    title: "Team Outings & Offsites",
    description:
      "Matching custom apparel designed for team outings, company offsites and memorable experiences.",
    image: "/images/corporate-needs/offsite.jpg",
    button: "Outfit Your Next Offsite",
    href: "#contact",
  },
];

function CorporateNeedCard({ item }) {
  return (
    <article className="group min-w-0">
      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[1.35/1]
          overflow-hidden
          rounded-[24px]
          bg-[#F3F6F8]

          sm:rounded-[28px]
        "
      >
        <img
          src={item.image}
          alt={item.title}
          className="
            h-full
            w-full
            object-cover

            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.035]
          "
        />

        {/* subtle hover overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-[#113858]/0

            transition-colors
            duration-500

            group-hover:bg-[#113858]/10
          "
        />

        {/* ARROW */}
        <div
          className="
            absolute
            right-5
            top-5

            flex
            h-[42px]
            w-[42px]
            shrink-0
            items-center
            justify-center

            rounded-full
            bg-white
            text-[#113858]

            opacity-0
            translate-y-2

            transition-all
            duration-300

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={17}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-2 pt-6 text-center">
        <h3
          className="
            break-words
            text-[21px]
            font-semibold
            leading-[1.2]
            tracking-[-0.035em]
            text-[#113858]

            lg:text-[23px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mx-auto
            mt-3
            max-w-[390px]
            break-words

            text-[13px]
            leading-[1.7]
            text-[#607487]

            lg:text-[13.5px]
          "
        >
          {item.description}
        </p>

        <a
          href={item.href}
          className="
            group/button

            mx-auto
            mt-5

            inline-flex
            h-[44px]
            max-w-full
            items-center
            justify-center
            gap-2

            whitespace-nowrap
            rounded-full

            border
            border-[#113858]

            bg-[#113858]
            px-5

            text-[11.5px]
            font-semibold
            text-white

            transition-all
            duration-300
            ease-out

            hover:-translate-y-[2px]
            hover:bg-white
            hover:text-[#113858]

            hover:shadow-[0_8px_22px_rgba(17,56,88,0.10)]
          "
        >
          {item.button}

          <ArrowUpRight
            size={13}
            strokeWidth={2}
            className="
              shrink-0
              transition-transform
              duration-300

              group-hover/button:translate-x-[2px]
              group-hover/button:-translate-y-[2px]
            "
          />
        </a>
      </div>
    </article>
  );
}

function CorporateNeeds() {
  return (
    <section
      className="
        bg-white
        px-5
        py-20

        sm:px-6

        md:py-24

        lg:px-8
        lg:py-28
      "
    >
      {/* HEADER */}
      <div
        className="
          mx-auto
          mb-12
          max-w-[900px]
          text-center

          md:mb-14
        "
      >
        {/* EYEBROW */}
        <div
          className="
            mb-4
            inline-flex
            items-center
            gap-2

            whitespace-nowrap
            rounded-full

            border
            border-[#113858]/10

            bg-[#F5F8FA]

            px-3.5
            py-[7px]
          "
        >
          <span
            className="
              h-[6px]
              w-[6px]
              shrink-0
              rounded-full
              bg-[#113858]
            "
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#113858]/60
            "
          >
            Made for every occasion
          </span>
        </div>

        {/* HEADING */}
        <h2
          className="
            break-words
            text-[34px]
            font-semibold
            leading-[1.08]
            tracking-[-0.045em]
            text-[#113858]

            sm:text-[42px]

            lg:text-[48px]
          "
        >
          Custom clothing for
          <span className="text-[#113858]/45">
            {" "}every corporate need.
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            mx-auto
            mt-5
            max-w-[650px]
            break-words

            text-[13px]
            leading-[1.75]
            text-[#607487]

            sm:text-[14px]
          "
        >
          From everyday office wear to important events and team
          experiences, create apparel that keeps your people looking
          consistent and your brand recognisable.
        </p>
      </div>

      {/* CARDS */}
      <div
        className="
          mx-auto
          grid
          max-w-[1380px]
          grid-cols-1
          gap-x-5
          gap-y-12

          md:grid-cols-3

          lg:gap-x-6
        "
      >
        {needs.map((item) => (
          <CorporateNeedCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default CorporateNeeds;