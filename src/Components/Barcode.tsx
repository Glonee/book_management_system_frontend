//条形码组件
import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";
export default function Barcode({ data, height = 100, width = 2 }: { data: string, height?: number, width?: number }) {
    const svgref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (data !== "") {
            JsBarcode(svgref.current, data, { font: "Roboto", height: height, width: width });
        }
    }, [data, height, width]);
    return <svg ref={svgref} />
}