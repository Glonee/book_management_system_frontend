import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
export default function Barcode({ data }: { data: string }) {
    const svgref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (data !== "") {
            JsBarcode(svgref.current, data, { font: "Roboto" });
        }
    }, [data]);
    return <svg ref={svgref} />
}