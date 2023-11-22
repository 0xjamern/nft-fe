type Props = {
  openTab: number;
  selTab: number;
  tabLabel: string;
  setOpenTab: (id: number) => void;
};

export const TabHeader = ({ openTab, selTab, tabLabel, setOpenTab }: Props) => {
  return (
    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === selTab
            ? "text-white bg-indigo-600"
            : "text-indigo-600 bg-white")
        }
        onClick={(e) => {
          e.preventDefault();
          setOpenTab(selTab);
        }}
        data-toggle="tab"
        role="tablist"
      >
        {tabLabel}
      </a>
    </li>
  );
};
