/**
 * Compatibility component retained for the existing product-page integration.
 * Browser titles remain controlled exclusively by the page metadata.
 */
export default function TabTakeover(props: { productName: string }) {
    void props.productName;
    return null;
}
