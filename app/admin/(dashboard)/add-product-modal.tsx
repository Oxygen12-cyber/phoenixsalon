"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { PlusIcon, ScissorsIcon } from "@phosphor-icons/react";
import ProductForm from "./products/product-form";

const AddProductModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size="lg" onPress={() => setOpen(true)}>
        <PlusIcon size={16} weight="bold" aria-hidden />
        Add product
      </Button>

      <Modal.Backdrop isOpen={open} onOpenChange={setOpen} variant="blur">
        <Modal.Container placement="center" scroll="inside" size="lg">
          <Modal.Dialog className="max-w-3xl overflow-hidden rounded-3xl p-0 shadow-[0_24px_80px_-24px_rgba(28,20,16,0.45)] ring-1 ring-black/10">
            <Modal.Header className="flex flex-row items-center gap-3 border-b border-black/10 bg-white px-6 py-5 sm:px-8">
              <Modal.Icon className="rounded-xl bg-[#F7EBE7] text-black">
                <ScissorsIcon size={18} weight="regular" aria-hidden />
              </Modal.Icon>
              <div className="flex min-w-0 flex-col gap-0.5">
                <Modal.Heading className="text-lg font-bold tracking-tight text-black">
                  New product
                </Modal.Heading>
                <p className="text-xs font-light text-[#6B6560]">
                  Add a style or extension to your service menu.
                </p>
              </div>
              <Modal.CloseTrigger className="static ml-auto h-9 w-9 shrink-0 rounded-full text-black/55 transition-colors hover:bg-black/5 hover:text-black" />
            </Modal.Header>
            <Modal.Body className="m-0 min-h-0 flex-1 overflow-y-auto bg-[#FAF7F5] p-0">
              <ProductForm
                variant="modal"
                onCancel={() => setOpen(false)}
                onSuccess={() => setOpen(false)}
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
};

export default AddProductModal;
