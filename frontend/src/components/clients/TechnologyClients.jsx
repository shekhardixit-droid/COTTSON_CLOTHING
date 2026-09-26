const logos = [
  "stampmyvisa.png",
  "pinelabs.png",
  "benow.png",
  "khaitan.png",
];

const reviews = [
  {
    quote:
      "The quality and finish of the apparel were excellent. The entire process was smooth and the final products matched our brand perfectly.",
    name: "Client Name",
    company: "Technology Brand",
  },
  {
    quote:
      "From customization to delivery, the experience was seamless. The team understood our requirements and delivered exactly what we needed.",
    name: "Client Name",
    company: "Fintech Brand",
  },
];

export default function TechnologyClients() {
  return (
    <section
      id="industry-technology"
      className="
        bg-white
        px-6 py-20
        sm:px-8 sm:py-24
        lg:px-12 lg:py-28
      "
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="max-w-[700px]">
          <h2
            className="
              break-words
              text-[26px] font-semibold
              leading-[1.15]
              tracking-[-0.03em]
              text-[#113858]

              sm:text-[30px]
              sm:leading-[1.1]

              lg:whitespace-nowrap
              lg:text-[34px]
              lg:leading-[1.08]
              lg:tracking-[-0.04em]
            "
          >
            Technology, Services & Fintech
          </h2>
        </div>

        <div
          className="
            mt-14
            grid grid-cols-2
            items-center
            gap-4
            sm:grid-cols-3
            lg:grid-cols-5
          "
        >
          {logos.map((logo, index) => (
            <div
              key={logo}
              className="
                aspect-square
                flex items-center justify-center
                rounded-[16px]
                border border-[#113858]/10
                bg-white
                transition-all duration-300
                hover:border-[#113858]/20
                hover:shadow-[0_8px_25px_rgba(17,56,88,0.06)]
              "
            >
              <div className="flex h-[82%] w-[82%] items-center justify-center">
                <img
                  src={logo}
                  alt={`Technology and fintech client ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="
                  min-w-0
                  rounded-[20px]

                  bg-white
                  p-7
                  sm:p-8
                "
              >
                <p
                  className="
                    break-words
                    text-[16px]
                    leading-[1.65]
                    tracking-[-0.01em]
                    text-[#113858]
                    sm:text-[17px]
                  "
                >
                  “{review.quote}”
                </p>

                <div className="mt-7 min-w-0">
                  <p className="break-words text-[12px] font-semibold text-[#113858]">
                    {review.name}
                  </p>

                  <p className="mt-1 break-words text-[11px] text-[#607487]">
                    {review.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}