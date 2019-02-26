// C# code
// using System;
// using System.Linq;
// using System.Collections.Generic;
import { CPU, Core } from './models';
import * as fs from 'fs';
import { promisify } from 'util';


function convertMHztoGHz( mhz : number ) : number {
    return mhz / Math.pow(10, 3);
}

export async function Parse( cpuInfoFilePath : string = '/proc/cpuinfo' ) : Promise<CPU> {
    const readFile = promisify( fs.readFile );
    let file = await readFile( cpuInfoFilePath, { encoding: 'utf8' } );
    let coreStringArrays : string[][] = 
        file
            .split( '\n\n' )
            .map( ( core : string ) => core.split( '\n' ) );
    
    let coreDicts : Map<string,string>[] =
        coreStringArrays
            .map( ( coreStringArray : string[] ) => {
                let coreDict : Map<string, string> = new Map();
                for( let line in coreStringArray ) {
                    let pair : string[] = line.split( ' : ' );
                    let key = pair[0].replace( ' ', '' );
                    let value = pair[1];
                    coreDict.set( key, value );
                }
                return coreDict;
            } )
    
    let cpu = new CPU();

    let modelname = coreDicts[0].get( 'modelname' );
    if( modelname !== undefined ) {
        cpu.name = modelname;
    }
    cpu.cores =
        coreDicts
            .map( ( coreDict : Map<string, string> ) => {
                let mhz = coreDict.get( 'cpuMHz' );
                if( mhz !== undefined ) {
                    return new Core( convertMHztoGHz( parseFloat( mhz ) ) )
                }
                else {
                    return undefined;
                }
            } )
            .filter( ( core ) => { return core !== undefined } ) as Core[];
    
    return cpu;    
}

