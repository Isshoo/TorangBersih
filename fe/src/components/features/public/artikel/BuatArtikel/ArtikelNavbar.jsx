import React from "react";
import {
  RiSaveLine,
  RiCheckDoubleLine,
  RiLoader4Line,
  RiCheckLine,
  RiAlertLine,
  RiEyeLine,
} from "react-icons/ri";

const STEPS = [
  { id: 1, label: "Tulis" },
  { id: 2, label: "Lengkapi" },
  { id: 3, label: "Terbitkan" },
];

const ArtikelNavbar = ({
  saveStatus,
  isDirty,
  canPublish,
  currentStep = 1,
  onSaveDraft,
  onPublish,
  onPreview,
}) => {
  return (
    <header className="z-[9999] rounded-lg border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-4">
        {/* STEP PROGRESS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {STEPS.map((step, idx) => {
            const done = step.id < currentStep;
            const active = step.id === currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-0.5">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                      done
                        ? "bg-green-500 text-white"
                        : active
                          ? "bg-[#1e1f78] text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {done ? <RiCheckLine className="h-3 w-3" /> : step.id}
                  </div>

                  <span
                    className={`hidden text-[10px] sm:block ${
                      active
                        ? "text-[#1e1f78]"
                        : done
                          ? "text-green-600"
                          : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < STEPS.length - 1 && (
                  <div
                    className={`h-px w-6 sm:w-10 ${
                      done ? "bg-green-400" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ACTION BUTTON */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <SaveStatus saveStatus={saveStatus} isDirty={isDirty} />
          </div>

          <button
            onClick={onSaveDraft}
            disabled={!isDirty || saveStatus === "saving"}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 p-2 text-gray-700 hover:border-[#1e1f78] hover:bg-blue-50 hover:text-[#1e1f78] disabled:opacity-40 sm:px-4 sm:py-2"
          >
            <RiSaveLine className="h-4 w-4" />
            <span className="hidden sm:inline">Simpan Draf</span>
          </button>

          <button
            onClick={onPreview}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 p-2 text-gray-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 sm:px-4 sm:py-2"
          >
            <RiEyeLine className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={onPublish}
            disabled={!canPublish}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white ${
              canPublish
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {canPublish ? (
              <>
                <RiCheckDoubleLine className="h-4 w-4" />
                <span className="hidden sm:inline">Terbitkan</span>
              </>
            ) : (
              <>
                <RiAlertLine className="h-4 w-4" />
                <span className="hidden sm:inline">Belum Siap</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

function SaveStatus({ saveStatus, isDirty }) {
  if (saveStatus === "saving") {
    return (
      <span className="flex items-center gap-1 text-xs text-gray-500">
        <RiLoader4Line className="animate-spin" />
        Menyimpan...
      </span>
    );
  }

  if (saveStatus === "saved") {
    return (
      <span className="flex items-center gap-1 text-xs text-green-600">
        <RiCheckLine />
        Tersimpan
      </span>
    );
  }

  if (isDirty) {
    return <span className="text-xs text-amber-600">Belum disimpan</span>;
  }

  return null;
}

export default ArtikelNavbar;
