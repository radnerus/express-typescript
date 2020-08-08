const express = require('express');
const bodyParser = require('body-parser');

const app = express();

type person = {
	firstName: string;
	lastName: string;
	clientId: string;
};

// existing users
const users = [
	{
		data1: {
			firstName: 'JOHN0000',
			lastName: 'MICHAEL000',
			clientId: '9994567'
		}
	},
	{
		data2: {
			firstName: 'JOHN',
			lastName: 'MICHAEL',
			clientId: '999-4567'
		}
	}
];

app.use(bodyParser.json());

app.post('/api/v1/parse', (req: any, res: any) => {
	const { data } = req.body;
	const dataArr: Array<string> = data.split('');
	const clientId = dataArr.splice(data.lastIndexOf('0') + 1).join('');

	let isPrevZero = false;
	let breakIndex;
	for (let e in dataArr) {
		if (dataArr[e] === '0') isPrevZero = true;
		if (isPrevZero && data[e] !== '0') {
			breakIndex = e;
			break;
		}
	}

	const firstName = data.substring(0, breakIndex);
	const lastName = data.substring(breakIndex, data.lastIndexOf('0'));

	res.json({ firstName, lastName, clientId });
});

app.post('/api/v2/parse', (req: any, res: any) => {
	const { data } = req.body;
	const dataArr: Array<string> = data.split('');
	const clientId = dataArr.splice(data.lastIndexOf('0') + 1).join('');

	let isPrevZero = false;
	let breakIndex;
	for (let e in dataArr) {
		if (dataArr[e] === '0') isPrevZero = true;
		if (isPrevZero && data[e] !== '0') {
			breakIndex = e;
			break;
		}
	}

	const firstName = dataArr.splice(0, data.indexOf('0')).join('');
	const lastName = dataArr.filter((e) => e !== '0').join('');

	res.json({
		firstName,
		lastName,
		clientId: clientId.substring(0, 3) + '-' + clientId.substring(3)
	});
});

app.listen(3000, () => console.log('server started'));
