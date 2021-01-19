import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function useBreakPoint() {
  return process.env.NODE_ENV !== "test"
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useBreakpoint()
    : {
        xs: false,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: false,
      };
}
