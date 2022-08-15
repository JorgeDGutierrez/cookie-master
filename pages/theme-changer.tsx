import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { GetServerSideProps } from 'next'
import Cookies from 'js-cookie';
import axios from "axios";

interface Props {
    theme: string;
}

import { Layout } from "../components/layouts";

const ThemeChangerPage: FC<Props> = ({ theme }) => {

    //console.log(props);

    const [currentTheme, setCurrentTheme] = useState(theme);
    const onThemeCahge = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value;
        console.log({ selectedTheme });
        setCurrentTheme(selectedTheme);

        localStorage.setItem('theme', selectedTheme)
        Cookies.set('theme', selectedTheme);
    }

    const onClick = async () => {
        const { data } = await axios.get('/api/hello');
        console.log(data);
    }

    useEffect(() => {
        console.log('localStorage', localStorage.getItem('theme'));
        console.log('Cookies', Cookies.get('theme'));
    }, [])


    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup
                            value={currentTheme}
                            onChange={onThemeCahge}
                        >
                            <FormControlLabel value='light' control={<Radio />} label="Light" />
                            <FormControlLabel value='dark' control={<Radio />} label="Dark" />
                            <FormControlLabel value='custom' control={<Radio />} label="Custom" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={onClick}
                    >
                        Solicitud
                    </Button>
                </CardContent>
            </Card>
        </Layout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { theme = 'light', name = 'No name' } = req.cookies;

    const validTheme = ['light', 'dark', 'custom'];


    return {
        props: {
            theme: validTheme.includes(theme) ? theme : 'dark',
            name,
        }
    }
}


export default ThemeChangerPage;