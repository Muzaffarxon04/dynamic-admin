import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import BuildingOffice2Icon from "@heroicons/react/24/solid/BuildingOffice2Icon";
import ArrowDownCircleIcon from "@heroicons/react/24/solid/ArrowsUpDownIcon";

import UsersIcon from "@heroicons/react/24/solid/FlagIcon";

import QueueListIcon from "@heroicons/react/24/solid/QueueListIcon";

import { SvgIcon } from '@mui/material';
import Content from "src/Localization/Content";
import { useSelector } from 'react-redux';
export function Items() {
  const { lang } = useSelector((state) => state.localiztion);

  const { localization } = Content[lang];



  const items = [
    // {
    //   accessRole: [
    //     "owner",
    //     "tasischi",
    //     "moliyachi",
    //     "sotuvchi",
    //     "omborchi",
    //     "prorab",
    //     "taminotchi",
    //     "kassir",
    //   ],
    //   title: localization.sidebar.home,
    //   path: "/",
    //   icon: (
    //     <SvgIcon fontSize="small">
    //       <ChartBarIcon />
    //     </SvgIcon>
    //   ),
    // },

    {
      accessRole: [
        "owner",
        "tasischi",
        "moliyachi",
        "sotuvchi",
        "omborchi",
        "prorab",
        "taminotchi",
      ],
      title: localization.sidebar.site,
      path: "/review",
      icon: (
        <SvgIcon fontSize="medium">
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.72656 1.2041H14.8535C14.792 0.421875 14.335 0 13.4912 0H5.08008C4.24512 0 3.7793 0.421875 3.72656 1.2041ZM1.93359 3.73535H16.6465C16.5234 2.90039 16.1016 2.42578 15.1699 2.42578H3.41016C2.47852 2.42578 2.05664 2.90039 1.93359 3.73535ZM2.88281 19.916H15.6885C17.5781 19.916 18.5713 18.9316 18.5713 17.0596V8.02441C18.5713 6.14355 17.5781 5.16797 15.6885 5.16797H2.88281C0.984375 5.16797 0 6.14355 0 8.02441V17.0596C0 18.9404 0.984375 19.916 2.88281 19.916ZM2.98828 18.1934C2.1709 18.1934 1.72266 17.7627 1.72266 16.9102V8.16504C1.72266 7.3125 2.1709 6.89062 2.98828 6.89062H15.583C16.3916 6.89062 16.8486 7.3125 16.8486 8.16504V16.9102C16.8486 17.7627 16.3916 18.1934 15.583 18.1934H14.4141C12.5 18.1934 11.3467 18.1934 9 18.1934C6.66211 18.1934 6.5 18.1934 4.23633 18.1934H2.98828Z"
              fill="currentColor"
            />
            <path
              d="M7.27238 17H11.8204C12.5669 17 13 16.5727 13 15.7563V11.8078C13 10.9914 12.563 10.5641 11.7276 10.5641H11.1823C11.163 9.70959 10.4243 9 9.5 9C8.57956 9 7.83702 9.70959 7.81768 10.5641H7.27238C6.43702 10.5641 6 10.9914 6 11.8078V15.7563C6 16.5727 6.43702 17 7.27238 17ZM9.5 9.67525C10.0298 9.67525 10.4204 10.0682 10.4359 10.5641H8.56409C8.57956 10.0682 8.97017 9.67525 9.5 9.67525Z"
              fill="currentColor"
            />
          </svg>
        </SvgIcon>
      ),
      },
        {
          accessRole: [
            "owner",
            "tasischi",
            "moliyachi",
            "sotuvchi",
            "omborchi",
            "prorab",
            "taminotchi",
          ],
          title: localization.sidebar.delivers,
          path: "/projects",
          icon: (
            <SvgIcon fontSize="small">
              <UsersIcon />
            </SvgIcon>
          ),
        },
        {
          accessRole: [
            "owner",
            "tasischi",
            "moliyachi",
            "sotuvchi",
            "omborchi",
            "prorab",
            "taminotchi",
          ],
          title: localization.sidebar.products,
          path: "/hire",
          icon: (
            <SvgIcon fontSize="small">
              <QueueListIcon />
            </SvgIcon>
          ),
        },
        // {
        //   accessRole: [
        //     "owner",
        //     "tasischi",
        //     "moliyachi",
        //     "sotuvchi",
        //     "omborchi",
        //     "prorab",
        //     "taminotchi",
        //   ],
        //   title: localization.sidebar.main_warehouse,
        //   path: "/admin",
        //   icon: (
        //     <SvgIcon fontSize="small">
        //       <BuildingOffice2Icon />
        //     </SvgIcon>
        //   ),
        // },

   
  ];

return items
}
