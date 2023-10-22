import NextHead from "next/head";

export const Head = () => {
	return (
		<NextHead>
			<title>Bulletin gBoard</title>
			<meta name="description" content="Gen with NEXT JS"/>
			<meta key="viewport" content="width=device-width, initial-scale=1"/>
			<link href="/favicon.ico" rel="icon" />
		</NextHead>
	);
};
