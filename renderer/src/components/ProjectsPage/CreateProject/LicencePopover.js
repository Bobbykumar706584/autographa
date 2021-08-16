import React, { Fragment, useState } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import { BlockEditable } from 'markdown-translatable/dist/components';
import { ProjectContext } from '../../context/ProjectContext';

export default function LicencePopover() {
  const [name, setName] = React.useState();
  const [content, setContent] = React.useState();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = React.useState(false);
  const [lock, setLock] = React.useState(false);
  const [preview, setPreview] = useState(true);

  function closeModal() {
    setIsOpen(false);
    setPreview(true);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    states: {
      copyright,
      licenceList,
    }, actions: { setCopyRight },
  } = React.useContext(ProjectContext);
  // eslint-disable-next-line no-unused-vars
  const openlicenceNav = (nav) => {
    if (nav === 'edit') {
      // eslint-disable-next-line import/no-dynamic-require
      const licensefile = require(`../../../lib/license/${copyright.id}.md`);
      setEdit(true);
      setName(copyright.title);
      setLock(copyright.locked);
      setContent(licensefile.default);
    } else {
      setEdit(false);
      setName();
      setContent();
      setLock(false);
    }
  };
  const callback = (markdown) => {
    // logger.debug('markdownviewer.js', `set translation as ${markdown}`);
    setContent(markdown);
  };
  const addLicence = () => {
    // eslint-disable-next-line no-template-curly-in-string
    setCopyRight({ id: `custom${licenceList.length + 1}`, title: name, licence: content });
  };
  return (

    <>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => { openlicenceNav('add'); openModal(); }}
          className="focus:outline-none"
        >
          <img
            src="illustrations/add-button.svg"
            alt="add button"
          />
        </button>
        <button
          type="button"
          onClick={() => { openlicenceNav('edit'); openModal(); }}
          className="focus:outline-none"
        >
          <img
            src="illustrations/edit.svg"
            alt="edit button"
          />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block  max-w-md overflow-hidden text-left align-middle transition-all transform bg-white rounded">
                <div className="m-8">
                  <div className="">
                    <h2 className="uppercase font-bold leading-5 tracking-widest ">new license</h2>
                    <Switch.Group as="div" className="flex items-center space-x-4">
                      <Switch.Label>Preview</Switch.Label>
                      <Switch
                        as="button"
                        checked={preview}
                        onChange={setPreview}
                        className={`${
                          preview ? 'bg-indigo-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
                      >
                        {({ checked }) => (
                          <span
                            className={`${
                              checked ? 'translate-x-5' : 'translate-x-0'
                            } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                          />
                        )}
                      </Switch>
                    </Switch.Group>
                  </div>
                  <div className="mt-8 mb-10">
                    <input
                      placeholder="License Name"
                      className="bg-gray-200 w-96 block rounded shadow-sm sm:text-sm border border-gray-300 h-10 focus:ring-primary pl-3"
                      value={name}
                      onChange={(e) => { setName(e.target.value); }}
                      disabled={lock}
                    />
                  </div>
                  <div>
                    {/* <textarea
                      placeholder="License Description"
                      className="h-96 border rounded border-gray-300 bg-gray-200 w-96 min-h-full"
                      value={content}
                      onChange={(e) => { setContent(e.target.value); }}
                      disabled={lock}
                    /> */}
                    <BlockEditable
                      markdown={content}
                      preview={preview}
                      onEdit={callback}
                      inputFilters={[
                        [/<br>/gi, '\n'],
                        [/(<u>|<\/u>)/gi, '__'],
                      ]}
                      outputFilters={[[/\n/gi, '<br>']]}
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    {lock ? <div />
                    : (
                      <button
                        type="button"
                        className="mt-5 bg-success w-28 h-8 border-color-success rounded uppercase text-white text-xs shadow focus:outline-none"
                        onClick={() => { addLicence(); closeModal(); }}
                      >
                        {edit ? 'save' : 'create'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeModal}
                      className=" mt-5
                     bg-error w-28 h-8 border-color-error rounded uppercase shadow text-white text-xs tracking-wide leading-4 font-light focus:outline-none"
                    >
                      cancel
                    </button>
                  </div>

                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
