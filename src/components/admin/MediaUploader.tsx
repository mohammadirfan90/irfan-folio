"use client";

import React, { useState, useRef } from "react";
import { uploadAssetAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, UploadCloud, RefreshCw, XCircle } from "lucide-react";

interface MediaUploaderProps {
  label: string;
  destinationPath: string;
  currentUrl?: string;
  onUploadSuccess: (url: string) => void;
}

export function MediaUploader({
  label,
  destinationPath,
  currentUrl = "",
  onUploadSuccess,
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState(currentUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (fileToUpload: File) => {
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("folder", destinationPath);

      const res = await uploadAssetAction(formData);
      if (res.error) {
        throw new Error(res.error);
      }

      const publicUrl = res.publicUrl || "";
      setUrl(publicUrl);
      onUploadSuccess(publicUrl);
      setSelectedFile(null); // Reset selected file after success
    } catch (err: any) {
      setError(err.message || "Cloudinary upload failed. Check credentials.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    uploadFile(file);
  };

  const handleRetry = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const handleCancelSelected = () => {
    setSelectedFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTriggerPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3 p-5 bg-neutral-50/50 border border-neutral-200/80 rounded-xl">
      <label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider select-none">
        {label}
      </label>

      {/* Success State */}
      {url && (
        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200/60 rounded-md text-emerald-800 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="font-semibold block text-[13px] text-emerald-900 leading-none mb-1 select-none">Upload Success</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate block hover:text-emerald-950 underline leading-normal font-medium text-xs break-all"
            >
              {url}
            </a>
          </div>
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleTriggerPicker}
            className="h-7 text-xs border-emerald-200 bg-white hover:bg-emerald-100/30 text-emerald-700 font-semibold cursor-pointer shrink-0 ml-2"
          >
            Replace File
          </Button>
        </div>
      )}

      {/* Error State with Retry option */}
      {error && (
        <div className="space-y-2.5 p-3.5 bg-red-50 border border-red-200/60 rounded-md text-red-800 text-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold block text-[13px] text-red-900 leading-none mb-1 select-none">Upload Failed</span>
              <p className="text-xs text-red-700 leading-relaxed font-medium">
                {error}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {selectedFile && (
              <Button
                type="button"
                onClick={handleRetry}
                disabled={isUploading}
                size="xs"
                className="h-7 text-xs bg-red-600 text-white hover:bg-red-700 cursor-pointer font-semibold"
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${isUploading ? "animate-spin" : ""}`} />
                Retry Upload
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={handleCancelSelected}
              className="h-7 text-xs border-red-200 bg-white hover:bg-red-100/30 text-red-700 font-semibold cursor-pointer"
            >
              Clear / Choose New
            </Button>
          </div>
        </div>
      )}

      {/* Standard / Uploading Input Picker */}
      {!url && !error && (
        <div 
          onClick={!isUploading ? handleTriggerPicker : undefined}
          className={`border border-dashed border-neutral-200/80 rounded-xl p-5 bg-white flex flex-col items-center justify-center gap-2 select-none cursor-pointer transition-all hover:bg-neutral-50/50 hover:border-neutral-300 ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
        >
          <UploadCloud className={`w-8 h-8 text-neutral-400 ${isUploading ? "animate-pulse" : ""}`} />
          <div className="text-center">
            {isUploading ? (
              <span className="text-sm font-semibold text-neutral-600 animate-pulse block">
                Uploading: {selectedFile?.name || "File"}...
              </span>
            ) : (
              <>
                <span className="text-sm font-semibold text-neutral-700 block">
                  Click to select file
                </span>
                <span className="text-xs text-neutral-400 block mt-0.5">
                  Images (JPEG, PNG, WebP) or Documents (PDF, etc.)
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />
    </div>
  );
}
