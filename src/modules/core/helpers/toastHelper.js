export const successToast = ({ title = "", text = "" }) => {
  window.$vue.$store.dispatch("setToastConfig", {
    status: "success",
    title,
    text,
  })
}

export const errorToast = ({ title = "", text = "" }) => {
  window.$vue.$store.dispatch("setToastConfig", {
    status: "error",
    title,
    text,
  })
}
