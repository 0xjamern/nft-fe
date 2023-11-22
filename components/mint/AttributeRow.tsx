import { AttributeType } from "../../utils/types";

type Props = {
  attributes: AttributeType[];
  updateAttribute: (ind: number) => void;
  setAttributeKey: (ind: number, value: string) => void;
  setAttributeValue: (ind: number, value: string) => void;
};

export const AttributeRow = ({
  attributes,
  updateAttribute,
  setAttributeKey,
  setAttributeValue,
}: Props) => {
  return (
    <>
      <label className="mt-3 block text-sm font-medium leading-6 text-gray-900">
        Attributes
        <button
          onClick={() => updateAttribute(-1)}
          className="ml-2 rounded-full bg-blue-400 text-xs font-bold text-white lg:px-5 lg:text-base"
        >
          Add
        </button>
      </label>
      {attributes.map((attribute: AttributeType, ind: number) => (
        <div
          key={ind}
          className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7"
        >
          <div className="sm:col-span-3">
            <input
              type="text"
              value={attribute.key}
              placeholder={"AttributeKey" + (ind + 1).toString()}
              onChange={(e) => setAttributeKey(ind, e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="sm:col-span-3">
            <input
              type="text"
              value={attribute.value}
              placeholder={"AttributeValue" + (ind + 1).toString()}
              onChange={(e) => setAttributeValue(ind, e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:col-span-1 text-center">
            <button
              onClick={() => updateAttribute(ind)}
              className="mt-2 rounded-full bg-lime-400 text-xs font-bold text-white lg:px-5 lg:text-base"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
