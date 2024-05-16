declare module "*.svg" {
  const value:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | string;
  export default value;
}
