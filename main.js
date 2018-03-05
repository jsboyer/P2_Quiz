const readline = require('readline');
const cmds = require('./cmds');

const {log, figlog, errorlog, colorea} = require('./out');

figlog ('CORE Quiz', 'green');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorea('quiz> ', 'blue'),
  completer: (line) => {
  	const completions = 'h help add delete edit list test p play credits q quit'.split(' ');
  	const hits = completions.filter((c) => c.startsWith(line));
  	// show all completions if none found
  	return [hits.length ? hits : completions, line];
 }
});

rl.prompt();

rl
.on('line', (line) => {

	let args = line.split(" ");
	let cmd = args[0].toLowerCase().trim();

  switch (cmd) {
    case '':
    	rl.prompt();
    	break;

    case 'h':
    case 'help':
    	cmds.helpCmd(rl);
    	break;

    case 'list':
    	cmds.listCmd(rl);
      	break;

    case 'show':
    	cmds.showCmd(rl, args[1]);
      	break;

    case 'add':
    	cmds.addCmd(rl);
      	break;

    case 'delete':
    	cmds.deleteCmd(rl, args[1]);
      	break;

    case 'edit':
    	cmds.editCmd(rl, args[1]);
      	break;

    case 'test':
    	cmds.testCmd(rl, args[1]);
      	break;

    case 'p':
    case 'play':
    	cmds.playCmd(rl);
      	break;

    case 'credits':
    	cmds.creditsCmd(rl);
      	break;

    case 'q':
    case 'quit':
    	cmds.quitCmd(rl);
      	break;

    default:
      log(`¿Cómo dices? Me parece que has dicho '${colorea(cmd, 'red')}'`);
      log(`Prueba ${colorea('help', 'green')} para ver todos los comandos disponibles`);
      rl.prompt();
      break;
  }
  
})
.on('close', () => {
  log('Arrivederci!');
  process.exit(0);
});