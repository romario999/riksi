import { Button } from "@/shared/components/ui";
import React from "react";
import { FaFileUpload, FaSpinner, FaUpload } from "react-icons/fa";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: (message: string) => void;
}

export const AdminImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImportSuccess }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [importing, setImporting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setMessage("");
  };

  const handleImport = async () => {
    if (!file) {
      setMessage("Будь ласка, оберіть файл для імпорту.");
      return;
    }

    setImporting(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/import-products", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      setMessage(text);

      if (onImportSuccess) onImportSuccess(text);
    } catch {
      setMessage("Сталася помилка при імпорті. Спробуйте ще раз.");
    } finally {
      setImporting(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Закриття модалки по Esc
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="import-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="import-modal-title" className="text-xl font-semibold mb-4">
          Імпорт товарів
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleFileChange}
          disabled={importing}
        />

        <Button
          variant="outline"
          onClick={triggerFileSelect}
          disabled={importing}
          className="flex items-center gap-2 mb-4 w-full justify-center"
        >
          <FaFileUpload />
          {file ? `${file.name}` : "Оберіть файл (.xlsx)"}
        </Button>

        {message && (
          <p
            className={`mb-4 px-4 py-2 rounded ${
              message.toLowerCase().includes("помилка")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={importing}
            className="text-gray-600 hover:text-gray-900"
          >
            Відмінити
          </Button>

          <Button
            onClick={handleImport}
            disabled={importing || !file}
            className="flex items-center gap-2"
          >
            {importing ? (
              <>
                <FaSpinner className="animate-spin" />
                Імпорт...
              </>
            ) : (
              <>
                <FaUpload />
                Імпортувати
              </>
            )}
          </Button>
        </div>

        <button
          aria-label="Закрити"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};