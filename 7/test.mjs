const folders = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const basicFolder = `1000 f
1000 g
1000 h.lst
1000 test
1000 something.txt
dir a
dir b
$ cd a
$ ls
1000 f
1000 g
1000 h.lst
1000 test
1000 something.txt
1000 something.txt
1000 something.txt
1000 something.txt
1000 something.txt
dir c
$ cd c
$ ls
1000 test.txt
1000 test.txt
1000 test.txt
$ cd ..
$ cd ..
$ cd b
$ ls
2000 test.txt`


export { folders, basicFolder };