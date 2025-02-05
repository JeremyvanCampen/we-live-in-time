import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ isOpen, closeModal, content }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="justify-center px-2 md:px-0 items-center flex overflow-x-hidden overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 fixed -translate-y-1/2 z-50 outline-none focus:outline-none w-full pointer-events-none"
            >
              <div className="relative my-6 mx-auto max-w-md w-auto pointer-events-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex flex-col items-center gap-y-12 text-black justify-between p-10 border-b border-solid border-blueGray-200 rounded-t">
                    <img width={200} src="/anniversary/trophy.png" />
                    {content}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              className="opacity-25 fixed inset-0 z-40 bg-black"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
