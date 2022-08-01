import { Circles } from 'react-loader-spinner'
export default function Loader({ show }) {
    return show ?

        <Circles height="80"
            width="80"
            radius="9"
            color="#FA541C"
        ></Circles> : null;
}