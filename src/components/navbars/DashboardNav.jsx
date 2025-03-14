import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  Card,
  List,
  Avatar,
  Menu,
  Tooltip,
  Accordion,
} from "@material-tailwind/react";
import {
  Archive,
  HeadsetHelp,
  LogOut,
  Menu as MenuIcon,
  MultiplePages,
  NavArrowDown,
  ProfileCircle,
  Rocket,
  SelectFace3d,
  Settings,
  UserCircle,
  Xmark,
} from "iconoir-react";
import PropTypes from "prop-types";
import useAxios from "../../hook/useAxios";
import useUserStore from "../../store/useUserStore";
import { Link } from "react-router";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router";

const LINKS = [
  {
    icon: ProfileCircle,
    title: "Account",
    href: "#",
  },
  {
    icon: SelectFace3d,
    title: "Blocks",
    href: "#",
  },
  {
    icon: Archive,
    title: "Docs",
    href: "#",
  },
];

function NavList() {
  return (
    <>
      {LINKS.map(({ icon: Icon, title, href }) => (
        <List.Item key={title} as="a" href={href}>
          <List.ItemStart className="mr-1.5">
            <Icon className="h-4 w-4" />
          </List.ItemStart>
          <Typography type="small">{title}</Typography>
        </List.Item>
      ))}
    </>
  );
}

function ProfileMenu({ userData }) {
  const { clearToken } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Trigger
        as={Avatar}
        src={`https://ui-avatars.com/api/?name=${userData?.first_name}+${userData?.last_name}?background=random`}
        alt="profile-picture"
        size="sm"
        className="border border-primary p-0.5 lg:ml-auto cursor-pointer"
      />
      <Menu.Content className="z-[200]">
        <Menu.Item>
          <UserCircle className="mr-2 h-[18px] w-[18px]" /> My Profile
        </Menu.Item>
        <Menu.Item onClick={() => navigate("/")}>
          <Settings className="mr-2 h-[18px] w-[18px]" />
          Home
        </Menu.Item>
        <Menu.Item>
          <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
        </Menu.Item>
        <hr className="!my-1 -mx-1 border-surface" />
        <Menu.Item
          onClick={clearToken}
          className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error"
        >
          <LogOut className="mr-2 h-[18px] w-[18px]" />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

const MenuItem = ({ title, description, ...rest }, ref) => {
  return (
    <Menu.Item ref={ref} {...rest} className="flex-col items-start">
      <Typography color="default" className="font-semibold">
        {title}
      </Typography>
      <Typography type="small" className="text-foreground">
        {description}
      </Typography>
    </Menu.Item>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function DashboardNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const { userData, setUserData } = useUserStore();
  const axiosInstance = useAxios();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const setUser = async () => {
    const response = await axiosInstance.get("/auth/get-current-user");
    setUserData(response.data);
  };

  React.useEffect(() => {
    setUser();
  }, []);

  return (
    <Navbar className="sticky top-0 w-full z-[100] rounded-none mx-0 px-5 bg-[#D2B0FD] border-none">
      <div className="flex items-center">
        <Link to="/dashboard">
          <Typography
            as="h1"
            type="small"
            className="ml-2 mr-2 text-xl block py-1 font-bold"
          >
            AnvikshAI
          </Typography>
        </Link>

        {/* <div className="hidden lg:block">
          <List className="mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center">
            <Tooltip placement="bottom" interactive>
              <Tooltip.Trigger>
                <List.Item>
                  <List.ItemStart className="me-1.5">
                    <MultiplePages className="h-4 w-4" />
                  </List.ItemStart>
                  <Typography type="small">Pages</Typography>
                  <List.ItemEnd className="ps-0.5">
                    <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                  </List.ItemEnd>
                </List.Item>
              </Tooltip.Trigger>
              <Tooltip.Content className="grid max-w-lg grid-cols-5 gap-1 rounded-lg border border-surface bg-background p-1 shadow-xl shadow-surface/5 dark:border-surface dark:bg-background">
                <Card
                  color="primary"
                  className="col-span-2 grid place-items-center rounded-[5px] px-8 py-4 text-primary-foreground shadow-none"
                >
                  <div>
                    <Rocket className="mx-auto h-12 w-12" />
                    <Typography
                      type="h6"
                      className="mt-5 text-center leading-snug"
                    >
                      Material Tailwind PRO
                    </Typography>
                  </div>
                </Card>
                <ul className="col-span-3 !m-0">
                  <MenuItem
                    title="@material-tailwind/html"
                    description="Learn how to use @material-tailwind/html, packed with rich components and widgets."
                  />
                  <MenuItem
                    title="@material-tailwind/react"
                    description="Learn how to use @material-tailwind/react, packed with rich components for React."
                  />
                  <MenuItem
                    title="Material Tailwind PRO"
                    description="A complete set of UI Elements for building faster websites in less time."
                  />
                </ul>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
            <NavList />
          </List>
        </div> */}
        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto mr-2 grid lg:hidden"
        >
          {openNav ? (
            <Xmark className="h-4 w-4" />
          ) : (
            <MenuIcon className="h-4 w-4" />
          )}
        </IconButton>
        <ProfileMenu userData={userData} />
      </div>
      <Collapse open={openNav}>
        <Accordion>
          <Accordion.Item value="react" className="mt-2 border-none">
            <Accordion.Trigger className="p-0">
              <List.Item className="w-full">
                <List.ItemStart className="me-1.5">
                  <MultiplePages className="h-4 w-4" />
                </List.ItemStart>
                <Typography type="small">Pages</Typography>
                <List.ItemEnd className="ps-1">
                  <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                </List.ItemEnd>
              </List.Item>
            </Accordion.Trigger>
            <Accordion.Content>
              <MenuItem
                title="@material-tailwind/html"
                description="Learn how to use @material-tailwind/html, packed with rich components and widgets."
              />
              <MenuItem
                title="@material-tailwind/react"
                description="Learn how to use @material-tailwind/react, packed with rich components for React."
              />
              <MenuItem
                title="Material Tailwind PRO"
                description="A complete set of UI Elements for building faster websites in less time."
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
