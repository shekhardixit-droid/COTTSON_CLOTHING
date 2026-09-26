import { useState } from "react";
import { Minus, Plus, MessageCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is the minimum order quantity?",
    answer:
      "Our minimum order quantity starts from 25 pieces. The exact requirement can vary depending on the garment, fabric and type of customisation you choose.",
  },
  {
    id: 2,
    question: "How long does production and delivery take?",
    answer:
      "Most orders are completed within 7–10 working days after the design, quantity and customisation details are approved. Larger or highly customised orders may require additional time.",
  },
  {
    id: 3,
    question: "Can we customise the garment colours?",
    answer:
      "Yes. You can choose colours that suit your company or team identity. Available options depend on the selected garment and fabric.",
  },
  {
    id: 4,
    question: "Can you add our company logo to the clothing?",
    answer:
      "Yes. We can customise apparel with your company logo and branding. Logo placement and the most suitable branding method can be finalised before production.",
  },
  {
    id: 5,
    question: "Can we see the design before production?",
    answer:
      "Yes. The design can be reviewed before production so you can check garment colours, logo placement and the overall appearance before confirming the order.",
  },
  {
    id: 6,
    question: "What types of corporate clothing do you offer?",
    answer:
      "Our range includes polo T-shirts, round-neck T-shirts, corporate shirts, jackets, hoodies, sweatshirts and other apparel suitable for offices, events and teams.",
  },
  {
    id: 7,
    question: "Do you handle bulk corporate orders?",
    answer:
      "Yes. We work with both smaller teams and larger corporate requirements. Production planning can be discussed based on your quantity, garment selection and delivery schedule.",
  },
  {
    id: 8,
    question: "Do you deliver across India?",
    answer:
      "Delivery options are available for corporate orders across India. Final delivery timelines and shipping details can be confirmed when your order requirements are discussed.",
  },
];

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-[20px]
        border
        transition-all
        duration-300

        ${
          isOpen
            ? "border-[#113858]/20 bg-[#F5F8FA]"
            : "border-[#113858]/10 bg-white hover:border-[#113858]/20"
        }
      `}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="
          flex
          w-full
          min-w-0
          items-center
          justify-between
          gap-5
          px-5
          py-5
          text-left

          sm:px-6
          sm:py-[22px]
        "
      >
        <span
          className="
            min-w-0
            break-words

            text-[14px]
            font-semibold
            leading-[1.45]
            tracking-[-0.02em]
            text-[#113858]

            sm:text-[15px]
          "
        >
          {item.question}
        </span>

        <span
          className={`
            flex
            h-[34px]
            w-[34px]
            shrink-0
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300

            ${
              isOpen
                ? "bg-[#113858] text-white"
                : "bg-[#E9F0F5] text-[#113858]"
            }
          `}
        >
          {isOpen ? (
            <Minus size={15} strokeWidth={2} />
          ) : (
            <Plus size={15} strokeWidth={2} />
          )}
        </span>
      </button>

      {/* ANSWER */}
      <div
        className={`
          grid
          transition-all
          duration-300
          ease-in-out

          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <p
            className="
              max-w-[720px]
              break-words
              px-5
              pb-6
              pr-14

              text-[12.5px]
              leading-[1.8]
              text-[#607487]

              sm:px-6
              sm:pr-20
              sm:text-[13px]
            "
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId((current) =>
      current === id ? null : id
    );
  };

  return (
    <section
      id="faq"
      className="
        bg-white
        px-5
        pb-24
        pt-12

        sm:px-6

        md:pb-28
        md:pt-16

        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1280px]
          gap-12

          lg:grid-cols-[0.72fr_1.28fr]
          lg:gap-20
        "
      >
        {/* =========================================
            LEFT
        ========================================== */}

        <div className="min-w-0 lg:sticky lg:top-[120px] lg:self-start">

          {/* LABEL */}
          <div
            className="
              mb-5
              inline-flex
              max-w-full
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
              FAQs
            </span>
          </div>

          {/* HEADING */}
          <h2
            className="
              max-w-[450px]
              break-words

              text-[36px]
              font-semibold
              leading-[1.05]
              tracking-[-0.05em]
              text-[#113858]

              sm:text-[44px]
              lg:text-[50px]
            "
          >
            Questions?
            <br />

            <span className="text-[#113858]/45">
              We've got answers.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-[410px]
              break-words

              text-[13px]
              leading-[1.8]
              text-[#607487]

              sm:text-[14px]
            "
          >
            Everything you need to know about ordering,
            customisation, production and delivery at Cottson.
          </p>

          {/* HELP BOX */}
          <div
            className="
              mt-8
              max-w-[390px]

              rounded-[22px]

              bg-[#E9F0F5]

              p-5

              sm:p-6
            "
          >
            <div
              className="
                flex
                h-[38px]
                w-[38px]
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-[#113858]
                text-white
              "
            >
              <MessageCircle
                size={16}
                strokeWidth={2}
              />
            </div>

            <h3
              className="
                mt-4
                break-words

                text-[15px]
                font-semibold
                tracking-[-0.02em]
                text-[#113858]
              "
            >
              Still have a question?
            </h3>

            <p
              className="
                mt-2
                break-words

                text-[12px]
                leading-[1.7]
                text-[#607487]
              "
            >
              Talk to our team and we'll help you with your
              product, quantity and customisation requirements.
            </p>

            <a
              href="#contact"
              className="
                mt-5

                inline-flex
                h-[40px]
                max-w-full
                items-center
                justify-center

                whitespace-nowrap
                rounded-full

                border
                border-[#113858]

                bg-[#113858]

                px-5

                text-[11px]
                font-semibold
                text-white

                transition-all
                duration-300

                hover:bg-white
                hover:text-[#113858]
              "
            >
              Talk to Our Team
            </a>
          </div>
        </div>

        {/* =========================================
            RIGHT — ACCORDION
        ========================================== */}

        <div className="flex min-w-0 flex-col gap-3">
          {faqs.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onClick={() => toggleFAQ(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;