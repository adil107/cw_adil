export const copyToClipBoard = async (copyMe) => {
  try {
      await navigator.clipboard.writeText(copyMe)
      return true
  } catch (err) {
      return false
  }
}