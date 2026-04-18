import {
  computed,
  defineComponent,
  h,
  ref,
  watch,
  type CSSProperties,
  type PropType,
} from "vue";
import {
  type AgentFaceConfig,
  generateAgentFaceConfig,
  renderAgentFaceSvgDataUri,
} from "@agent-face/core";

function normalizeImageUrl(imageUrl?: string) {
  const normalized = imageUrl?.trim();
  return normalized ? normalized : undefined;
}

function createSketchPlaceholder() {
  return h(
    "span",
    {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        pointerEvents: "none",
        backgroundColor: "#f4f7fb",
        backgroundImage: [
          "radial-gradient(circle at 18% 18%, rgba(59, 130, 246, 0.10), transparent 28%)",
          "radial-gradient(circle at 82% 22%, rgba(148, 163, 184, 0.16), transparent 22%)",
          "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(239,244,249,0.94))",
          "repeating-linear-gradient(135deg, rgba(148,163,184,0.12) 0 10px, rgba(148,163,184,0.04) 10px 20px)",
        ].join(", "),
      } satisfies CSSProperties,
    },
    [
      h("span", {
        style: {
          position: "absolute",
          inset: "22% 22% auto",
          aspectRatio: "1 / 1",
          borderRadius: "28%",
          border: "1.5px dashed rgba(71, 85, 105, 0.22)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.08))",
        } satisfies CSSProperties,
      }),
      h("span", {
        style: {
          position: "absolute",
          left: "28%",
          right: "28%",
          bottom: "21%",
          height: "8%",
          borderRadius: "999px",
          background:
            "linear-gradient(90deg, rgba(148,163,184,0.12), rgba(71,85,105,0.22), rgba(148,163,184,0.12))",
        } satisfies CSSProperties,
      }),
    ],
  );
}

export const AgentFace = defineComponent({
  name: "AgentFace",
  inheritAttrs: false,
  props: {
    seed: String,
    config: Object as PropType<AgentFaceConfig | undefined>,
    size: {
      type: [Number, String] as PropType<number | string | undefined>,
      default: 160,
    },
    className: String,
    imageUrl: String,
    imageAlt: String,
    imageClassName: String,
    loading: {
      type: String as PropType<"eager" | "lazy">,
      default: "lazy",
    },
    decoding: {
      type: String as PropType<"async" | "auto" | "sync">,
      default: "async",
    },
    referrerPolicy: {
      type: String as PropType<HTMLImageElement["referrerPolicy"]>,
      default: "no-referrer",
    },
    title: {
      type: String,
      default: "AgentFace avatar",
    },
  },
  setup(props, { attrs }) {
    const resolvedConfig = computed(() => props.config ?? generateAgentFaceConfig(props.seed ?? ""));
    const fallbackSrc = computed(() => renderAgentFaceSvgDataUri(resolvedConfig.value));
    const currentSrc = ref(normalizeImageUrl(props.imageUrl) ?? fallbackSrc.value);
    const isImageLoading = ref(Boolean(normalizeImageUrl(props.imageUrl)));

    watch(
      [() => props.imageUrl, fallbackSrc],
      ([nextImageUrl, nextFallbackSrc]) => {
        const normalized = normalizeImageUrl(nextImageUrl);
        currentSrc.value = normalized ?? nextFallbackSrc;
        isImageLoading.value = Boolean(normalized);
      },
      { immediate: true },
    );

    const rootStyle = computed<CSSProperties>(() => {
      const dimension = typeof props.size === "number" ? `${props.size}px` : props.size;
      return {
        width: dimension,
        height: dimension,
        display: "inline-block",
        lineHeight: 0,
        position: "relative",
        overflow: "hidden",
        background: "#f4f7fb",
        ...(attrs.style as CSSProperties | undefined),
      };
    });

    const showPlaceholder = computed(
      () =>
        Boolean(normalizeImageUrl(props.imageUrl)) &&
        currentSrc.value !== fallbackSrc.value &&
        isImageLoading.value,
    );

    function handleImageLoad() {
      isImageLoading.value = false;
    }

    function handleImageError() {
      if (currentSrc.value !== fallbackSrc.value) {
        currentSrc.value = fallbackSrc.value;
      }
      isImageLoading.value = false;
    }

    return () =>
      h(
        "span",
        {
          class: [attrs.class, props.className],
          style: rootStyle.value,
          title: props.title,
          role: "img",
          "aria-label": props.title,
        },
        [
          showPlaceholder.value ? createSketchPlaceholder() : null,
          h("img", {
            alt: props.imageAlt ?? props.title,
            class: ["block h-full w-full object-cover", props.imageClassName],
            decoding: props.decoding,
            loading: props.loading,
            referrerPolicy: props.referrerPolicy,
            src: currentSrc.value,
            style: {
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              borderRadius: "inherit",
              opacity: showPlaceholder.value ? 0 : 1,
              transition: "opacity 180ms ease",
            } satisfies CSSProperties,
            onError: handleImageError,
            onLoad: handleImageLoad,
          }),
        ],
      );
  },
});

export type { AgentFaceConfig } from "@agent-face/core";
