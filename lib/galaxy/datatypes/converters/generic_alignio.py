from Bio import AlignIO
import sys
AlignIO.convert(*sys.argv[1:5])
"""
# Generate the converter XML files. Just move the bottom quotes to the top of
# the file.
formats = [
    'Clustal', 'Emboss', 'Fasta', 'Fasta-m10', 'Ig', 'Nexus', 'Phylip', 'Stockholm'
]
unwriteable = ['Emboss', 'Fasta-m10', 'Ig']
tpl = '''
<tool id="CONVERTER_{from_format}_to_{to_format}_0" name="Convert {from_format} to {to_format}" version="1.0.0">
    <command interpreter="python">
        generic_alignio.py $input1 {from_format} $output1 {to_format}
    </command>
    <inputs>
        <param format="{from_format}" name="input1" type="data" label="Choose {from_format} file" />
    </inputs>
    <outputs>
        <data format="{to_format}" name="output1" />
    </outputs>
    <help>
    </help>
</tool>
'''

for from_format in formats:
    print '''<datatype extension="%s" type="galaxy.datatypes.sequence:%s" display_in_upload="True">''' % (from_format.lower(), from_format)
    for to_format in formats:
        if from_format == to_format:
            continue

        if to_format in unwriteable:
            continue

        with open('%s_to_%s.xml' % (from_format.lower(), to_format.lower()), 'w') as handle:
            handle.write(tpl.format(from_format=from_format.lower(), to_format=to_format.lower()))

        print '''  <converter file="%s_to_%s.xml" target_datatype="%s"/>''' % (from_format.lower(), to_format.lower(), to_format.lower())

    print '''</datatype>'''
"""
