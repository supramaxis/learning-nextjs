"use client";
import React, { useRef, useState, Fragment } from "react";

import { UrlsModalProps } from "@/types";
import { Dialog, Transition } from "@headlessui/react";

const UrlsModal: React.FC<UrlsModalProps> = ({ onUrlCreated }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const customCodeRef = useRef<HTMLInputElement>(null);

  function isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  const handleClick = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      const url = inputRef.current?.value || "";
      const customCode = customCodeRef.current?.value || '';

      if (!isValidURL(url)) {
        inputRef.current?.setCustomValidity("URL invalida");
        inputRef.current?.reportValidity();
        setLoading(false);
        return;
      }
      //fetch the api endpoint to create a short url using async await

      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, customCode }),
      });
      const data = await res.json();
      setLoading(false);
      onUrlCreated(data);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }



  return (
    <>
      <div className=" inset-0 flex items-center justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={openModal}
        >
          Crear Enlaces
        </button>

      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Crear Enlaces
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text text-gray-900">
                          Link a acortar
                        </span>
                      </label>
                      <input
                        ref={inputRef}
                        type="url"
                        placeholder="URL"
                        className="input input-bordered w-full max-w-xs bg-slate-200"
                        required
                        pattern='^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$'
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text text-gray-900">
                          Codigo personalizado
                        </span>
                      </label>
                      <input
                        type="text"
                        ref={customCodeRef}
                        placeholder="(ejem: my-link)"
                        className="input input-bordered w-full max-w-xs bg-slate-200 "
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleClick}
                    >
                      Crear
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UrlsModal;
