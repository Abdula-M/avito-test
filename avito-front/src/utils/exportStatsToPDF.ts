import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface ExportPDFOptions {
    period: "today" | "week" | "month" | "custom";
}

export const exportStatsToPDF = async (
    element: HTMLElement,
    options: ExportPDFOptions
): Promise<void> => {
    let clonedElement: HTMLElement | null = null;

    try {
        toast.loading("Генерация PDF файла...", { id: "pdf-export" });

        const originalCursor = document.body.style.cursor;
        document.body.style.cursor = "wait";

        clonedElement = element.cloneNode(true) as HTMLElement;

        const rect = element.getBoundingClientRect();

        const style = document.createElement("style");
        style.id = "pdf-export-temp-style";
        style.textContent = `
            .pdf-export-clone,
            .pdf-export-clone * {
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
            }
        `;
        document.head.appendChild(style);

        clonedElement.classList.add("pdf-export-clone");
        clonedElement.style.position = "absolute";
        clonedElement.style.left = "-9999px";
        clonedElement.style.top = "0";
        clonedElement.style.width = `${rect.width}px`;
        clonedElement.style.minWidth = `${rect.width}px`;

        document.body.appendChild(clonedElement);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const dataUrl = await domtoimage.toPng(clonedElement, {
            quality: 1,
            scale: 2,
            bgcolor: "#ffffff",
        });

        document.body.removeChild(clonedElement);
        const tempStyle = document.getElementById("pdf-export-temp-style");
        if (tempStyle) {
            document.head.removeChild(tempStyle);
        }
        clonedElement = null;

        const img = new Image();
        img.src = dataUrl;

        await new Promise((resolve) => {
            img.onload = resolve;
        });

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (img.height * imgWidth) / img.width;
        let heightLeft = imgHeight;

        const pdf = new jsPDF("p", "mm", "a4");
        let position = 0;

        pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        const fileName = `stats_${options.period}_${new Date().toISOString().split("T")[0]}.pdf`;

        pdf.save(fileName);

        document.body.style.cursor = originalCursor;

        toast.success("PDF файл успешно экспортирован!", { id: "pdf-export" });
    } catch (error) {
        console.error("Error generating PDF:", error);

        if (clonedElement && document.body.contains(clonedElement)) {
            document.body.removeChild(clonedElement);
        }
        const tempStyle = document.getElementById("pdf-export-temp-style");
        if (tempStyle) {
            document.head.removeChild(tempStyle);
        }

        document.body.style.cursor = "default";
        toast.error("Ошибка при генерации PDF файла", { id: "pdf-export" });
    }
};
