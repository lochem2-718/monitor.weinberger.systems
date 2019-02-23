
// C# code
// using System;
// using System.Linq;
// using System.Collections.Generic;

// namespace performance_reader
// {
//     public static class CPUInfoParser
//     {
//         public static CPU Parse( string cpuinfoFilePath )
//         {
//             // get fields: model name, cpu MHz
//             string file = FileReader.Read(cpuinfoFilePath);
//             string[][] coreStringArrays = 
//                 file
//                     .Split("\n\n")
//                     .Select<string, string[]>( core => core.Split('\n') )
//                     .ToArray();

//             Dictionary<string, string>[] coreDicts =
//                 coreStringArrays
//                     .Select<string[], Dictionary<string, string>>(coreStringArray => {
//                         Dictionary<string, string> coreDict = new Dictionary<string, string>();
//                         foreach( string line in coreStringArray)
//                         {
//                             string[] pair = line.Split(" : ");
//                             pair[0] = pair[0].Replace(" ", "");
//                             try
//                             {
//                                 coreDict.Add(pair[0], pair[1]);
//                             }
//                             catch (Exception e)
//                             {
//                                 Console.WriteLine(e.Message);
//                             }
//                         }
//                         return coreDict;
//                     })
//                     .ToArray();
//             CPU cpu = new CPU();
//             cpu.Name = coreDicts[0]["modelname"];
//             cpu.Cores = 
//                 coreDicts
//                     .Select<Dictionary<string, string>, CPU.Core>(coreDict => 
//                             new CPU.Core { ClockSpeed = MegahertzToGigahertz(float.Parse(coreDict["cpuMHz"])) }
//                     )
//                     .ToArray();

//             float sumOfClockSpeeds = 0F;
//             foreach (CPU.Core core in cpu.Cores)
//             {
//                 sumOfClockSpeeds += core.ClockSpeed;
//             }

//             cpu.ClockSpeed = sumOfClockSpeeds / cpu.Cores.Length;

//             return cpu;
//         }

//         private static float MegahertzToGigahertz( float megaherz )
//         {
//             return megaherz * (float) Math.Pow(10, 3);
//         }
//     }
// }
