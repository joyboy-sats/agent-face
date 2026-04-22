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
  type CharacterType,
  generateAgentFaceConfig,
  renderAgentFaceSvgDataUri,
} from "@agent-face/core";

function normalizeImageUrl(imageUrl?: string) {
  const normalized = imageUrl?.trim();
  return normalized ? normalized : undefined;
}

export type LoadingShowcaseMode = "skeleton" | "avatar";

const SKETCH_PLACEHOLDER_STYLE = `
@keyframes agentface-skeleton-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.92; }
}
`;

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
        backgroundColor: "#f8fafc",
      } satisfies CSSProperties,
    },
    [
      h("style", SKETCH_PLACEHOLDER_STYLE),
      h("span", {
        style: {
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          background: "rgba(241, 245, 249, 0.95)",
          animation: "agentface-skeleton-pulse 1.5s ease-in-out infinite",
        } satisfies CSSProperties,
      }),
    ],
  );
}

function createAvatarPlaceholder(fallbackSrc: string, title: string) {
  return h("img", {
    alt: "",
    "aria-hidden": "true",
    src: fallbackSrc,
    title,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      display: "block",
      objectFit: "cover",
      borderRadius: "inherit",
      pointerEvents: "none",
      background: "#f4f7fb",
    } satisfies CSSProperties,
  });
}

export const AgentFace = defineComponent({
  name: "AgentFace",
  inheritAttrs: false,
  props: {
    seed: String,
    config: Object as PropType<AgentFaceConfig | undefined>,
    characterType: {
      type: String as PropType<CharacterType>,
      default: "robot",
    },
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
    loadingShowcaseMode: {
      type: String as PropType<LoadingShowcaseMode>,
      default: "skeleton",
    },
    title: {
      type: String,
      default: "AgentFace avatar",
    },
  },
  setup(props, { attrs }) {
    const resolvedConfig = computed(() =>
      props.config ?? generateAgentFaceConfig(props.seed ?? "", props.characterType)
    );
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
          showPlaceholder.value
            ? props.loadingShowcaseMode === "avatar"
              ? createAvatarPlaceholder(fallbackSrc.value, props.title)
              : createSketchPlaceholder()
            : null,
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

export type { AgentFaceConfig, CharacterType } from "@agent-face/core";
